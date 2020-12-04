import React from 'react';
import { useDrop } from 'react-dnd';

export interface DropZoneProps {
  style: React.CSSProperties;
  accept: string[];
  lastDroppedItem?: any;
  onDrop: (item: any) => void;
}

export const DropZone: React.FC<DropZoneProps> = ({ style, accept, lastDroppedItem, onDrop }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const isActive = isOver && canDrop;
  let backgroundColor = '#222';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
    <div ref={drop} className="dropZone" style={{ ...style/*, backgroundColor*/ }}>
      {/*isActive ? 'Release to drop' : `This dropzone accepts: ${accept.join(', ')}`*/}

      {/*lastDroppedItem && (
        <p>Last dropped: {JSON.stringify(lastDroppedItem)}</p>
      )*/}
    </div>
  );
}