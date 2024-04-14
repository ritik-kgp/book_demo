"use client";
import React, { useEffect, useRef } from "react";
import useTextHighlighter from "../hooks/highlight.jsx";


const GenericHTMLContent = React.memo(({ htmlContent, multiplier, highlightedIds }) => {
  const contentRef = useRef(null);
  const highlightedTexts = useTextHighlighter(contentRef);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.innerHTML = htmlContent;
      console.log("[[[[[[[[[[[[[[[[ multiplier is", multiplier)
      contentRef.current.style.setProperty('--scale-factor', multiplier);
      //adjustStyles(contentRef.current, multiplier);
    }
  }, [htmlContent, multiplier]);

  useEffect(() => {
    console.log("Highlighted Texts:", highlightedTexts);
  }, [highlightedTexts]);

  useEffect(() => {
    if (contentRef.current && highlightedIds.length > 0) {
      // Define the click event handler
      const removeHighlighting = () => {
        highlightedIds.forEach(highlightId => {
          const span = contentRef.current.querySelector(`#${highlightId}`);
          if (span) {
            span.style.backgroundColor = ""; // Clear background color
            span.style.color = ""; // Clear text color
          }
        });
      };
  
      // Apply initial highlighting and set up click event listeners
      highlightedIds.forEach(id => {
        const span = contentRef.current.querySelector(`#${id}`);
        if (span && span.textContent.trim() !== "") {
          span.style.backgroundColor = "rgba(255, 255, 0, 0.7)"; // Apply highlighting style
          span.style.color = "black"; // Apply text color
          span.addEventListener('click', removeHighlighting); // Attach click event handler
        }
      });
  
      // Cleanup function to remove the event listeners
      return () => {
        highlightedIds.forEach(id => {
          const span = contentRef.current.querySelector(`#${id}`);
          if (span) {
            span.removeEventListener('click', removeHighlighting); // Remove click event handler
          }
        });
      };
    }
  }, [highlightedIds]);
  
  
  
  // const adjustStyles = (container, multiplier) => {
  //   //const multiplier = 1.35;
  //   //const specialMultiplier = multiplier < 1.5 ? (1.38/1.37 * multiplier) : 1.4/1.37 * multiplier ; // Additional value for 'y' prefixed classes
  //   const specificClasses = ["w0", "w1"]; // Specific classes to adjust

  //   // Apply style adjustments to specific classes
  //   specificClasses.forEach((className) => {
  //     const elements = container.getElementsByClassName(className);
  //     Array.from(elements).forEach((element) => {
  //       const style = window.getComputedStyle(element);
  //       let originalValue, property;

  //       if (className.startsWith("h")) {
  //         originalValue = parseFloat(style.height);
  //         property = "height";
  //       } else if (className.startsWith("w")) {
  //         originalValue = parseFloat(style.width);
  //         property = "width";
  //       }

  //       if (!isNaN(originalValue)) {
  //         const newValue = originalValue * multiplier;
  //         element.style[property] = `${newValue}px`;
  //       }
  //     });
  //   });

  //   // Adjustments for classes with prefixes 'x', 'y', or 'fs'
  //   const allElements = container.querySelectorAll("*");
  //   allElements.forEach((el) => {
  //     el.classList.forEach((cls) => {
  //       if (cls.startsWith("x")) {
  //         // Exclude 'x' prefix from specific class adjustments
  //         const style = window.getComputedStyle(el);
  //         const originalValue = parseFloat(style.left);
  //         const newValue = originalValue * multiplier;
  //         el.style.left = `${newValue}px`;
  //       } else if (cls.startsWith("y") && !specificClasses.includes(cls)) {
  //         // Apply adjustment with alpha for 'y' prefixed classes
  //         const style = window.getComputedStyle(el);
  //         const originalValue = parseFloat(style.bottom);
  //         const newValue = originalValue * multiplier;
  //         el.style.bottom = `${newValue}px`;
  //       } else if (cls.startsWith("fs") && !specificClasses.includes(cls)) {
  //         // Adjust 'fs' prefixed classes
  //         const style = window.getComputedStyle(el);
  //         const originalValue = parseFloat(style.fontSize);
  //         const newValue = originalValue * multiplier;
  //         el.style.fontSize = `${newValue}px`;
  //       } else if (cls.startsWith("ws") && !specificClasses.includes(cls)) {
  //         // Adjust 'ws' prefixed classes
  //         const style = window.getComputedStyle(el);
  //         const originalValue = parseFloat(style.wordSpacing);
  //         const newValue = originalValue * multiplier;
  //         console.log(`O .... ${originalValue} , new is ${newValue}`);
  //         el.style.wordSpacing = `${newValue}px`;
  //       } else if (cls.startsWith("h") && !specificClasses.includes(cls)) {
  //         // Adjust 'h' prefixed classes
  //         const style = window.getComputedStyle(el);
  //         const originalValue = parseFloat(style.height);
  //         const newValue = originalValue * multiplier;
  //         console.log(`O .... ${originalValue} , new is ${newValue}`);
  //         el.style.height = `${newValue}px`;
  //       }else if (cls.startsWith("ls") && !specificClasses.includes(cls)) {
  //         // Adjust 'ws' prefixed classes
  //         const style = window.getComputedStyle(el);
  //         const originalValue = parseFloat(style.lineSpacing);
  //         const newValue = originalValue * multiplier;
  //         console.log(`O .... ${originalValue} , new is ${newValue}`);
  //         el.style.lineSpacing = `${newValue}px`;
  //       }
  //     });
  //   });
  // };

  return <div ref={contentRef} />;
 
});

export default GenericHTMLContent;
