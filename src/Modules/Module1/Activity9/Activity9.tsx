import React, { useState } from 'react';
import { Choose } from '../../components/choose/choose';
import IActivityProps from '../../IActivityProps';

interface IToggleActivityProps {
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity9: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({ inProgressCondition, doneCondition, onSatisfiedCondition, onValidate }:IToggleActivityProps & IActivityProps) => {
    var items = [
        { name: 'Computer games for a week?', target: 'A', image: 'game_controller.svg', size: { width: '120px', height: '120px' } },
        { name: 'T.V. for a week?', target: 'B', image: 'retro_tv.svg', size: { width: '120px', height: '120px' } },
        { name: 'Sweets for a week?', target: 'C', image: 'sweets.svg', size: { width: '120px', height: '120px' } }
    ];

    const finished = (event: any) => {
        onSatisfiedCondition(event);
    }

    return (
        <div className="module moduleColumn">
            <div className="moduleHeadline">
                Would you rather go <span className="magenta">without</span>?
            </div>
            <div className="module moduleRow" style={{ overflow: 'visible' }}>
                <Choose items={items} background={''} callback={() => {}} finished={finished} />
            </div>
        </div>
    );
}
export default Activity9;

export type {
    IToggleActivityProps
}