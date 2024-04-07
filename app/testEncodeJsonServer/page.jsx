"use client"

import React, { useEffect, useState } from 'react';

const ChapterComponent = () => {
  const [htmlData, setHtmlData] = useState('');

  useEffect(() => {
    // Function to fetch chapter data
    const fetchChapterData = async () => {
      try {
        const response = await fetch('http://localhost:4000/db');
        if (!response.ok) {
          throw new Error('Data could not be fetched');
        } else {
          const db = await response.json();
          console.log(db);
          // Assuming data[2].page3 exists and is encoded properly
          const decodedPageHtml = decodeURIComponent(atob(db[0].page1));
          setHtmlData(decodedPageHtml);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchChapterData();
  }, []);

  useEffect(() => {
    const logSelection = () => {
      const text = window.getSelection().toString();
      if (text) {
        console.log(text);
      }
    };

    // Add the event listener for selectionchange event
    document.addEventListener('selectionchange', logSelection);

    // Cleanup function to remove the event listener
    return () => document.removeEventListener('selectionchange', logSelection);
  }, []); // This effect also runs only once

  return (
    <>
    <main className='w-[800px]'>
      <div>
        <h1>Chapters</h1>
      </div>
        <div
          dangerouslySetInnerHTML={{
            __html: htmlData,
          }}
        />
      </main>
    </>
  );
};

export default ChapterComponent;
