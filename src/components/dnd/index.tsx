import React, { useState } from 'react';
import Example from './example';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';


const App = () => {

  return (
    <>
      <div
        className="App"
        style={{ marginTop: '20px', marginLeft: '30px' }}
        onDragOver={(e) => {
          // e.stopPropagation();
          // e.preventDefault();
          // console.log('onDragOver');
        }}
      >
        <DndProvider backend={HTML5Backend}>
          <Example />
        </DndProvider>
        {/* <ListShuffler /> */}
      </div>
    </>
  );
};

export default App;
