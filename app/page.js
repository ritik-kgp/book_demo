'use client';
import React, { useEffect, useRef, useState } from 'react';
import PageComponent from './components/PageComponent';

const Book = () => {
  const [data, setData] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [pageHtml, setPageHtml] = useState('');
  const pageContainerRef = useRef(null);
  const cachedPages = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:4000/data');
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data) {
      if (cachedPages.current[currentPageIndex]) {
        setPageHtml(cachedPages.current[currentPageIndex]);
      } else {
        const encodedPageHtml = data[currentPageIndex][`page${currentPageIndex + 1}`];
        const decodedPageHtml = decodeURIComponent(atob(encodedPageHtml));
        cachedPages.current[currentPageIndex] = decodedPageHtml;
        setPageHtml(decodedPageHtml);
      }
    }
  }, [data, currentPageIndex]);

  useEffect(() => {
    if (data) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const nextPageIndex = currentPageIndex + 1;
              if (nextPageIndex < data.length) {
                const encodedNextPageHtml = data[nextPageIndex][`page${nextPageIndex + 1}`];
                if (encodedNextPageHtml) {
                  const decodedNextPageHtml = decodeURIComponent(atob(encodedNextPageHtml));
                  if (cachedPages.current[nextPageIndex]) {
                    const fullHtml = `${pageHtml}${cachedPages.current[nextPageIndex]}`;
                    setPageHtml(fullHtml);
                  } else {
                    cachedPages.current[nextPageIndex] = decodedNextPageHtml;
                    const fullHtml = `${pageHtml}${decodedNextPageHtml}`;
                    setPageHtml(fullHtml);
                  }
                  setCurrentPageIndex(nextPageIndex);
                }
              }
            }
          });
        },
        {
          threshold: 0.9, // Trigger the callback when the container is 50% visible
        }
      );

      const pageContainer = pageContainerRef.current;
      observer.observe(pageContainer);

      return () => {
        observer.disconnect();
      };
    }
  }, [currentPageIndex, pageHtml, data]);
  

  if (!data) {
    return <div>Loading...</div>;
  }

  // return (
  //   <div ref={pageContainerRef}>
  //     <PageComponent html={pageHtml} />
  //   </div>
  // );

  return(
    <div ref={pageContainerRef}>
  {data.map((page, index) => (
    <div key={index} className="w-[200px]">
      <PageComponent html={cachedPages.current[index]} />
    </div>
  ))}
</div>
  )
};

export default Book;