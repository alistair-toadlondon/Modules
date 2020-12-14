import React, { useState } from 'react';
import { Choose } from '../../components/choose/choose';
import IActivityProps from '../../IActivityProps';

interface IToggleActivityProps {
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity8: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({ inProgressCondition, doneCondition, onSatisfiedCondition, onValidate }:IToggleActivityProps & IActivityProps) => {
    var items = [
        { name: 'Paint a picture?', target: 'A', image: 'paint_brush.svg', size: { width: '120px', height: '120px' } },
        { name: 'Read a book?', target: 'B', image: 'book.svg', size: { width: '120px', height: '120px' } },
        { name: 'Play a board game?', target: 'C', image: 'boardgame.svg', size: { width: '120px', height: '120px' } }
    ];

    const finished = (event: any) => {
        onSatisfiedCondition(event);
    }

    return (
        <div className="module moduleColumn">
            <div className="moduleHeadline">
                Would you rather?
            </div>
            <div className="module moduleRow" style={{ overflow: 'visible' }}>
                <Choose items={items} background={''} callback={() => {}} finished={finished} />
            </div>
        </div>
    );
}
export default Activity8;

export type {
    IToggleActivityProps
}