import React from 'react';
import { useDrag } from 'react-dnd';
import { SVG } from './SVG';

export interface DropItemProps {
  name: string;
  type: string;
  svg: any;
  style: React.CSSProperties;
  isDropped: boolean;
}

export const DropItem: React.FC<DropItemProps> = ({ name, type, svg, style, isDropped }) => {
  const [{ opacity }, drag] = useDrag({
    item: { name, type },
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.4 : 1
    }),
  });

  return (
    <div ref={drag} className="dropItem" style={{ ...style, opacity }}>
      <SVG name={svg} />
      {/*isDropped ? <s>{name}</s> : name*/}
    </div>
  );
}