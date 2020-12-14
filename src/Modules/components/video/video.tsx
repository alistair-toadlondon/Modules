import React, { useState, useEffect, useRef } from 'react';
import Ed from './ed.mp4';
import Chloe from './chloe.mp4';
import './styles.css';
import '../../styles.css';
import '../../animation.css';

export interface VideoProps {
    width: number;
    height: number;
    character: string;
    transitionTo: string;
    borderColour: string;
    close: boolean;
}

export const Video: React.FC<VideoProps> = ({ width, height, character, transitionTo, borderColour, close }) => {
    const [status, setStatus] = useState('closed');
    const [transitionFrom, setTransitionFrom] = useState('neutral');
    const [video, setVideo] = useState((character.toLowerCase() === 'chloe') ? Chloe : Ed);

    const videoFile = useRef(null);
    useEffect(() => {
        if (videoFile) {
            const transitions = ['neutral', 'happy', 'sad', 'amazed'];
            transitionTo = transitionTo.toLowerCase();
            if (transitions.indexOf(transitionTo) > -1) {
                if (transitionTo === 'amazed') setTransitionFrom('neutral');

                /* @ts-ignore */
                if (transitionFrom === 'neutral' && transitionTo === 'happy') videoFile.current.currentTime = 0;
                /* @ts-ignore */
                else if (transitionFrom === 'happy' && transitionTo === 'neutral') videoFile.current.currentTime = 2;
                /* @ts-ignore */
                else if (transitionFrom === 'neutral' && transitionTo === 'sad') videoFile.current.currentTime = 4;
                /* @ts-ignore */
                else if (transitionFrom === 'sad' && transitionTo === 'neutral') videoFile.current.currentTime = 6;
                /* @ts-ignore */
                else if (transitionFrom === 'neutral' && transitionTo === 'happy') videoFile.current.currentTime = 8;
                /* @ts-ignore */
                else if (transitionFrom === 'happy' && transitionTo === 'sad') videoFile.current.currentTime = 10;
                /* @ts-ignore */
                else if (transitionFrom === 'sad' && transitionTo === 'happy') videoFile.current.currentTime = 12;
                /* @ts-ignore */
                else if (transitionFrom === 'happy' && transitionTo === 'neutral') videoFile.current.currentTime = 14;
                /* @ts-ignore */
                else if (transitionFrom === 'neutral' && transitionTo === 'amazed') videoFile.current.currentTime = 16;
                else return;

                setTransitionFrom(transitionTo);
                if (status === 'closed') setStatus('playing');
                /* @ts-ignore */
                videoFile.current.play();
                setTimeout(() => {
                    /* @ts-ignore */
                    videoFile.current.pause();
                    if (close) {
                        setTimeout(() => {
                            setStatus('closed');
                        }, 1000);
                    } else {
                        setStatus('open');
                    }
                }, 2000);
            }
        }
    });

    return (
        <div className={'videoContainer spring' + ((status === 'open' || status === 'playing') ? ' springup' : '')} style={{ width: width, height: height, padding: borderColour === '' ? '0' : '5px', background: borderColour }}>
            <div style={{ width: width - 10, height: height - 10 }}>
                <video ref={videoFile} width={width + 20} height={height + 20} style={{ margin: '-10px' }} muted={true}>
                    <source src={video} type="video/mp4" />
                </video>
            </div>
        </div>
    );
}