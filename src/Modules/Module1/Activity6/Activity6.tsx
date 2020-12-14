import React, { useState } from 'react';
import { Choose } from '../../components/choose/choose';
import IActivityProps from '../../IActivityProps';

interface IToggleActivityProps {
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity6: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({ inProgressCondition, doneCondition, onSatisfiedCondition, onValidate }:IToggleActivityProps & IActivityProps) => {
    var items = [
        { name: 'Hold a snake?', target: 'A', image: 'snake.svg', size: { width: '120px', height: '130px' } },
        { name: 'Stroke a tiger?', target: 'B', image: 'tiger.svg', size: { width: '120px', height: '120px' } },
        { name: 'Swim with sharks?', target: 'C', image: 'shark.svg', size: { width: '130px', height: '120px' } }
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
export default Activity6;

export type {
    IToggleActivityProps
}