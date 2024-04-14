 "use client"
import React, { useEffect, useState } from 'react';

// Custom Hook for text highlighting
const useTextHighlighter = (Componentref) => {
    const [selectedTexts, setSelectedTexts] = useState([]);
    const highlights = []; // Array to keep track of highlight styles and positions.
    const texts = [];
    useEffect(() => {
        let highlightId = 0; // Initialize a counter for unique identifiers.

        function addHighlightStyle(range, color, coordinates, text) {
            const styleId = `highlight-style-${highlightId}`;
            const style = document.createElement('style');
            document.head.appendChild(style);
            style.innerHTML = `
                ::selection {
                    background: #f06    ; /* Match the highlight color */
                    color: white;
                    padding:3px;
                }
                ::highlight(search-results-${highlightId}) {
                background-color: ${color} !important;
                color: white !important;
                cursor: pointer;
                }
            `;

            // Storing the coordinates of the highlight
            let pushtext = {
                id : highlightId,
                textcontent : text
            }

            let newTexts = [...texts, pushtext];
            texts.push(pushtext)
            
            setSelectedTexts(newTexts);
            highlights.push({
                text: text,
                id: highlightId,
                color: color,
                styleId: styleId,
                coordinates: coordinates,
                range: range,
            });

            highlightId++;
        }

        function highlightText() {
            if (!CSS.highlights) {
                console.error("CSS Custom Highlight API not supported.");
                return;
            }

            const selection = window.getSelection();
            if (!selection.rangeCount || selection.isCollapsed) {
                return;
            }

            const range = selection.getRangeAt(0);
            const article = document.querySelector("div");
            if (Componentref.current && Componentref.current.contains(range.commonAncestorContainer)) {
                const rect = range.getBoundingClientRect();
                const coordinates = {
                    x: rect.left + window.scrollX,
                    y: rect.top + window.scrollY,
                    width: rect.width,
                    height: rect.height
                };

                const newColor = getNewHighlightColor();
                addHighlightStyle(range, newColor, coordinates, selection.toString());

                const selectionHighlight = new Highlight(range);
                const highlightName = `search-results-${highlightId - 1}`;
                CSS.highlights.set(highlightName, selectionHighlight);
            }
        }

        function getNewHighlightColor() {
            return '#f06';
            // return 'yellow';
        }

        function removeHighlightStyle(highlightId) {
            const styleId = `highlight-style-${highlightId}`;
            const styleElement = document.head.querySelector(`#${styleId}`);
            if (styleElement) {
                document.head.removeChild(styleElement);
            }

            if (CSS.highlights) {
                const highlightName = `search-results-${highlightId}`;
                CSS.highlights.delete(highlightName);
            }

            const index = highlights.findIndex(highlight => highlight.id === highlightId);
            if (index !== -1) {
                highlights.splice(index, 1);
                texts.splice(index,1)
                setSelectedTexts(texts)


                // const newTexts = texts.filter((_, i) => i !== index);
                // setSelectedTexts(newTexts);
            }
        }

        document.addEventListener("mouseup", highlightText);
        document.addEventListener('click', function(event) {
            setTimeout(() => {
                const clickX = event.pageX;
                const clickY = event.pageY;
                const selection = window.getSelection();
                // console.log("Coordinates are:", )

                if (selection.isCollapsed) {
                    // console.log("Coordinates are:", )
                    for (const highlight of highlights) {
                        const range = highlight.range;
                        const rect = range.getBoundingClientRect(); // Recalculating coordinates dynamically
                        const {x, y, width, height} = {
                            x: rect.left + window.scrollX,
                            y: rect.top + window.scrollY,
                            width: rect.width,
                            height: rect.height
                        };

                        // const {id, x, y, width, height} = highlight.coordinates;
                        if (
                            clickX >= x && clickX <= x + width &&
                            clickY >= y && clickY <= y + height
                        ) {
                            console.log("To remove highlight of", highlight.id)
                            removeHighlightStyle(highlight.id);
                            break;
                        }
                    }
                }
            }, 10);
        });

        return () => {
            console.log("The highlights are", highlights)
            document.removeEventListener("mouseup", highlightText);
            highlights.forEach(highlight => {
                removeHighlightStyle(highlight.id);
            });
        };
    }, []);

    // console.log("--->",selectedTexts)
    return selectedTexts;
};

export default useTextHighlighter;



