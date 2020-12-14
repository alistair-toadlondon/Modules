import React, { useState } from 'react';
import { Choose } from '../../components/choose/choose';
import IActivityProps from '../../IActivityProps';

interface IToggleActivityProps {
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity5: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({ inProgressCondition, doneCondition, onSatisfiedCondition, onValidate }:IToggleActivityProps & IActivityProps) => {
    var items = [
        { name: 'Nibble a lolly?', target: 'A', image: 'ice_lolly.svg', size: { width: '130px', height: '190px' } },
        { name: 'Eat an ice cream?', target: 'B', image: 'ice_cream.svg', size: { width: '82px', height: '190px' } },
        { name: 'Lick an ice pop?', target: 'C', image: 'ice_pop.svg', size: { width: '65px', height: '185px' } }
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
export default Activity5;

export type {
    IToggleActivityProps
}