import React, { useState, useEffect, useRef } from 'react';
import { SVG } from '../svg/svg';
import './styles.css';
import '../../styles.css';

export interface InfoBoxProps {
    title: string;
    text: string[];
    colour: string;
    isToolTip?: boolean;
    style: React.CSSProperties;
}

export const InfoBox: React.FC<InfoBoxProps> = ({ title, text, colour, isToolTip, style }) => {
    if (isToolTip) colour = 'tooltip';

    return (
        <div className={ 'infoBox infoBox_' + colour } style={{ ...style }}>
            {isToolTip && (
                <>
                    <img src={require(`../../assets/tooltip.png`)} alt="Ed" className="tooltip" />
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <polygon points="20,0 20,20 0,20" fill="#FFC53D" />
                    </svg>
                </>
            )}

            <div>
                {title !== '' && (
                    <h2>{title}</h2>
                )}
                {text.map((t, index) => (
                    <p key={index}>{t}</p>
                ))}
            </div>
        </div>
    );
}