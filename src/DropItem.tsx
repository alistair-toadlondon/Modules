import React from 'react';
import { useDrag } from 'react-dnd';
import { SVG } from './SVG';
import useSound from 'use-sound';
const startMP3 = require('./assets/start.mp3');
const yesMP3 = require('./assets/yes.mp3');
const noMP3 = require('./assets/no.mp3');

export interface DropItemProps {
  name: string;
  type: string;
  image: any;
  style: React.CSSProperties;
  isDropped: boolean;
  callback: any;
}

export const DropItem: React.FC<DropItemProps> = ({ name, type, image, style, isDropped, callback }) => {
  const [{ opacity/*, zIndex, filter, transform*/ }, drag] = useDrag({
    item: { name, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1,
      //zIndex: monitor.isDragging() ? 3 : 0,
      //filter: monitor.isDragging() ? 'drop-shadow(0 0 10px #ccc)' : 'unset',
      //transform: monitor.isDragging() ? 'transform: rotate(-50deg)' : 'unset'
    }),
    begin: (monitor) => {
      playStart();
    },
    end: (item, monitor) => {
      if (isDropped) {
        playYes();
        callback(name);
      } else {
        playNo();
      }
    },
  });

  const [playStart] = useSound(startMP3);
  const [playYes] = useSound(yesMP3);
  const [playNo] = useSound(noMP3);

  return (
    <div ref={drag} className="dropItem" style={{ ...style, opacity }}>
      {(image.substr(image.lastIndexOf('.') + 1) === 'svg') && (
        <SVG name={image} />
      )}
      {(image.substr(image.lastIndexOf('.') + 1) !== 'svg') && (
        <img src={require(`./${image}`)} alt="" />
      )}
      {/*isDropped ? <s>{name}</s> : name*/}
    </div>
  );
}