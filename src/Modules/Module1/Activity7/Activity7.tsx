import React, { useState } from 'react';
import { Choose } from '../../components/choose/choose';
import IActivityProps from '../../IActivityProps';

interface IToggleActivityProps {
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity7: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({ inProgressCondition, doneCondition, onSatisfiedCondition, onValidate }:IToggleActivityProps & IActivityProps) => {
    var items = [
        { name: 'Play dodgeball?', target: 'A', image: 'chloe_dogeball.svg', size: { width: '120px', height: '120px' } },
        { name: 'Play tennis?', target: 'B', image: 'ed_tennis.svg', size: { width: '120px', height: '120px' } },
        { name: 'Go swimming?', target: 'C', image: 'ed_swim.svg', size: { width: '120px', height: '120px' } }
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
export default Activity7;

export type {
    IToggleActivityProps
}