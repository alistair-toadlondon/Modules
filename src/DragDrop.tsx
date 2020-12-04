import React, { useState, useCallback } from 'react';
import { DropZone } from './DropZone';
import { DropItem } from './DropItem';
import { SVG } from './SVG';
import update from 'immutability-helper';
import './dropzone.css';

interface DropZoneState {
  accepts: string[];
  style: React.CSSProperties;
  lastDroppedItem: any;
}
interface DropItemState {
  name: string;
  type: string;
  svg: string;
  style: React.CSSProperties;
}

export interface DragDropProps {
  items: any;
}
export interface DropZoneSpec {
  accepts: string[];
  lastDroppedItem: any;
}
export interface DropItemSpec {
  name: string;
  type: string;
}

export const ItemTypes = {
  FRONTAL_LOBE: 'frontal lobe',
  OCCIPITAL_LOBE: 'occipital lobe',
  TEMPORAL_LOBE: 'temporal lobe',
  CEREBELUM: 'cerebelum',
  MEDULA: 'medula',
  BRAIN_STEM: 'brain stem'
}

export const DragDrop: React.FC<DragDropProps> = ({ items }) => {
  const [dropZones, setDropZones] = useState<DropZoneState[]>([
    { accepts: [ItemTypes.FRONTAL_LOBE], style: { width: '264px', height: '239px', top: '11px', left: '11px' }, lastDroppedItem: null },
    { accepts: [ItemTypes.OCCIPITAL_LOBE], style: { width: '137px', height: '118px', top: '27px', left: '233px' }, lastDroppedItem: null },
    { accepts: [ItemTypes.TEMPORAL_LOBE], style: { width: '169px', height: '125px', top: '134px', left: '207px' }, lastDroppedItem: null },
    { accepts: [ItemTypes.CEREBELUM], style: { width: '39px', height: '102px', top: '107px', left: '365px' }, lastDroppedItem: null },
    { accepts: [ItemTypes.MEDULA], style: { width: '136px', height: '83px', top: '210px', left: '244px' }, lastDroppedItem: null },
    { accepts: [ItemTypes.BRAIN_STEM], style: { width: '77px', height: '123px', top: '249px', left: '188px' }, lastDroppedItem: null }
  ]);

  const [dropItems, setDropItems] = useState<DropItemState[]>([
    { name: 'frontal lobe', type: ItemTypes.FRONTAL_LOBE, svg: 'assets/frontal_lobe', style: { top: '-200px', left: '-280px' } },
    { name: 'occipital lobe', type: ItemTypes.OCCIPITAL_LOBE, svg: 'assets/occipital_lobe', style: { top: '100px', left: '-280px' } },
    { name: 'temporal lobe', type: ItemTypes.TEMPORAL_LOBE, svg: 'assets/temporal_lobe', style: { top: '350px', left: '-280px' } },
    { name: 'cerebelum', type: ItemTypes.CEREBELUM, svg: 'assets/cerebelum', style: { top: '-200px', right: '-280px' } },
    { name: 'medula', type: ItemTypes.MEDULA, svg: 'assets/medula', style: { top: '100px', right: '-280px' } },
    { name: 'brain stem', type: ItemTypes.BRAIN_STEM, svg: 'assets/brain_stem', style: { top: '350px', right: '-280px' } }
  ]);

  const [droppedItems, setDroppedItems] = useState<string[]>([]);

  function isDropped(dropItem: string) {
    return droppedItems.indexOf(dropItem) > -1;
  }

  const handleDrop = useCallback(
    (dropZoneIndex: number, item: { name: string }) => {     // index of dropzone
      const { name } = item;

      setDroppedItems(
        update(droppedItems, name ? { $push: [name] } : { $push: [] }),
      );

      let dropItemIndex = -1;
      for (var i = 0; i < dropItems.length; i++) {
        if (dropItems[i].name === name) dropItemIndex = i;
      }
      if (dropItemIndex > -1) {
        setDropItems(
          update(dropItems, {
            [dropItemIndex]: {
              style: {
                $set: {
                  top: dropZones[dropZoneIndex].style.top,
                  left: dropZones[dropZoneIndex].style.left
                }
              }
            }
          })
        );
      }

      setDropZones(
        update(dropZones, {
          [dropZoneIndex]: {
            lastDroppedItem: {
              $set: item
            }
          }
        })
      );

      let dropped = 1;
      for (i = 0; i < dropZones.length; i++) {
        if (dropZones[i].lastDroppedItem) dropped += 1;
      }
      if (dropped === dropZones.length) alert('You win!!!');
    },
    [droppedItems, dropZones, dropItems]
  );

  return (
    <div className="container">
      <SVG name="assets/brain" style={{ position: 'absolute', zIndex: 2 }} />

      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {dropZones.map(({ accepts, style, lastDroppedItem }, index) => (
          <DropZone
            accept={accepts}
            style={style}
            lastDroppedItem={lastDroppedItem}
            onDrop={(item) => handleDrop(index, item)}
            key={index}
          />
        ))}
      </div>

      <div style={{ overflow: 'hidden', clear: 'both' }}>
        {dropItems.map(({ name, type, svg, style }, index) => (
          <DropItem
            name={name}
            type={type}
            svg={svg}
            style={style}
            isDropped={isDropped(name)}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}