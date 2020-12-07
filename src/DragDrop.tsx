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
  image: string;
  style: React.CSSProperties;
}

export interface DragDropProps {
  items: any;
  background: string;
  callback: any;
  finished: any;
}
export interface DropZoneSpec {
  accepts: string[];
  lastDroppedItem: any;
}
export interface DropItemSpec {
  name: string;
  type: string;
}

export const DragDrop: React.FC<DragDropProps> = ({ items, background, callback, finished }) => {
  let dZones = [], dItems = [];
  for (const item of items) {
    dZones.push({
      accepts: [item.name],
      style: { width: item.size.width, height: item.size.width, top: item.endPos.Y, left: item.endPos.X },
      lastDroppedItem: null
    });
    dItems.push({
      name: item.name,
      type: item.name,
      image: item.image,
      style: { top: item.startPos.Y, left: item.startPos.X }
    });
  }
  const [dropZones, setDropZones] = useState<DropZoneState[]>(dZones);
  const [dropItems, setDropItems] = useState<DropItemState[]>(dItems);
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
      if (dropped === dropZones.length) finished(); //alert('You win!!!');
    },
    [droppedItems, dropZones, dropItems]
  );

  return (
    <div className="container">
      {(background.substr(background.lastIndexOf('.') + 1) === 'svg') && (
        <SVG name={background} style={{ position: 'absolute', zIndex: 2 }} />
      )}
      {(background.substr(background.lastIndexOf('.') + 1) !== 'svg') && (
        <img src={require(`./${background}`)} alt="" />
      )}

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
        {dropItems.map(({ name, type, image, style }, index) => (
          <DropItem
            name={name}
            type={type}
            image={image}
            style={style}
            isDropped={isDropped(name)}
            callback={callback}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}