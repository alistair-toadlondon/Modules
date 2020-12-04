import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragDrop } from './DragDrop';

function App() {
  return (
    <div className="App">
      <DndProvider backend={HTML5Backend}>
        <div style={{ width: '1000px', height: '800px', margin: 'auto', border: '1px dashed #ccc' }}>
         <DragDrop items={null} />
        </div>
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);