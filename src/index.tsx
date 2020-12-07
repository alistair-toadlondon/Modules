import React from 'react';
import ReactDOM from 'react-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragDrop } from './DragDrop';

function App() {
  var items = [
    { name: 'FRONTAL_LOBE', size: { width: '264px', height: '239px' }, startPos: { X: '-280px', Y: '-200px' }, endPos: { X: '11px', Y: '11px' }, image: 'assets/frontal_lobe.svg' },
    { name: 'OCCIPITAL_LOBE', size: { width: '137px', height: '118px' }, startPos: { X: '-280px', Y: '100px' }, endPos: { X: '233px', Y: '27px' }, image: 'assets/occipital_lobe.svg' },
    { name: 'TEMPORAL_LOBE', size: { width: '169px', height: '125px' }, startPos: { X: '-280px', Y: '350px' }, endPos: { X: '207px', Y: '134px' }, image: 'assets/temporal_lobe.svg' },
    { name: 'CEREBELUM', size: { width: '39px', height: '102px' }, startPos: { X: '520px', Y: '-200px' }, endPos: { X: '365px', Y: '107px' }, image: 'assets/cerebelum.svg' },
    { name: 'MEDULA', size: { width: '136px', height: '83px' }, startPos: { X: '520px', Y: '100px' }, endPos: { X: '244px', Y: '210px' }, image: 'assets/medula.svg' },
    { name: 'BRAIN_STEM', size: { width: '77px', height: '123px' }, startPos: { X: '520px', Y: '350px' }, endPos: { X: '188px', Y: '249px' }, image: 'assets/brain_stem.svg' }
  ];

  return (
    <div className="App">{/*1280 X 1024*/}
      <DndProvider backend={HTML5Backend}>
        <div style={{ width: '1000px', height: '800px', margin: 'auto', border: '1px dashed #ccc', background: 'url("' + require(`./assets/brain.svg`) + '") no-repeat center center' }}>
          <DragDrop items={items} background={''} />
        </div>
      </DndProvider>
    </div>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);