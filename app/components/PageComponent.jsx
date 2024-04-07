import React from "react";

const PageComponent = ({ html }) => {
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "600px", // Set the overall height of the container
  };

  const portionStyle = {
    flex: 1, // Each portion takes half of the container space
    overflowY: 'auto', // Enable vertical scroll if content overflows
    padding: '10px',
    border: '1px solid black', // Optional, to visually separate the portions
  };

  return (
    <>
      {/* <main className='flex w-screen flex-column'>
    <div className='w-2/5'></div>
    <div className='w-3/5'
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
    </main> */}

      <div style={containerStyle}>
        <div style={portionStyle}>
          <div dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </div>
    </>
  );
};

export default PageComponent;
