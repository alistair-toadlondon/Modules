import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd';
import { SVG } from '../svg/svg';
import useSound from 'use-sound';
const startMP3 = require('../../assets/start.mp3');
const yesMP3 = require('../../assets/yes.mp3');
const noMP3 = require('../../assets/no.mp3');

export interface DropItemProps {
    name: string;
    type: string;
    image: any;
    style: React.CSSProperties;
    isDropped: boolean;
    callback: any;
}

export const DropItem: React.FC<DropItemProps> = ({ name, type, image, style, isDropped, callback }) => {
    function collect(connect: any, monitor: any) {
        return {
            connectDragSource: connect.dragSource(),
            connectDragPreview: connect.dragPreview()
        };
    }

    function getStyles(isDragging: boolean): React.CSSProperties {
        //const transform = `translate3d(${left}px, ${top}px, 0)`
        return {
            //border: isDragging ? '5px solid green' : '5px solid red',
            //opacity: isDragging ? 0 : 1
            /*position: 'absolute',
            transform,
            WebkitTransform: transform,
            height: isDragging ? 0 : '',*/
        }
    }

    const [{ isDragging, opacity }, drag, preview] = useDrag({
        item: { name, type },
        collect: (monitor) => ({
            opacity: monitor.isDragging() ? 1.0 : 1,
            isDragging: monitor.isDragging()
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

    useEffect(() => {
        //preview(getEmptyImage(), { captureDraggingState: true });
    }, []);

    const [playStart] = useSound(startMP3);
    const [playYes] = useSound(yesMP3);
    const [playNo] = useSound(noMP3);

    return (
        <div ref={drag} className="dropItem" style={{ ...style, opacity }}>
            {(image.substr(image.lastIndexOf('.') + 1) === 'svg') && (
                <SVG src={image} />
            )}
            {(image.substr(image.lastIndexOf('.') + 1) !== 'svg') && (
                <img src={require(`./${image}`)} alt="" />
            )}
            {/*isDropped ? <s>{name}</s> : name*/}
        </div>
    );
}