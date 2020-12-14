import React, { useState } from 'react';
import { InfoBox } from '../../components/infobox/infobox';
import IActivityProps from '../../IActivityProps';

interface IToggleActivityProps {
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity10: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({ inProgressCondition, doneCondition, onSatisfiedCondition, onValidate }:IToggleActivityProps & IActivityProps) => {
    const [status, setStatus] = useState('');
    const [clicked, setClicked] = useState(['']);

    const show = (what: string, event: any) => {
        setStatus(what);

        let arr = [...clicked];
        if (arr.indexOf(what) === -1) {
            arr.push(what);
        }
        setClicked(arr);
        if (arr.length === 4) onSatisfiedCondition(event);
    }

    const finished = (event: any) => {
        onSatisfiedCondition(event);
    }

    return (
        <div className="module moduleColumn">
            <div className="moduleHeadline">
                Keeping our brains amazing...
            </div>
            <div className="module moduleRow" style={{ overflow: 'visible' }}>
                <div style={{ position: 'relative', display: 'inline-block', height: '70%', maxHeight: '70%' }}>
                    <img src={require(`../../assets/interactive.jpg`)} alt="" style={{ maxHeight: '100%' }} />
                    <div style={{ position: 'absolute', top: '12.5%', left: '4.5%', width: '20.3%', height: '61.5%', cursor: 'pointer',  background: '' }} onClick={() => { show('EdSister', null); }} />
                    {/*<div style={{ position: 'absolute', top: '36.2%', left: '32.5%', width: '16.0%', height: '29.9%', cursor: 'pointer', background: '' }} onClick={() => { show('Chloe', null); }} />*/}
                    <div style={{ position: 'absolute', top: '25.0%', left: '67.5%', width: '19.2%', height: '50.4%', cursor: 'pointer', background: '' }} onClick={() => { show('Ed', null); }} />
                    <div style={{ position: 'absolute', top: '79.7%', left: '46.0%', width: '24.8%', height: '16.2%', cursor: 'pointer', background: '' }} onClick={() => { show('Puppy', null); }} />

                    <InfoBox
                        title=""
                        text={[ "Ed's sister is... being active! Moving around isn't just great for our bodies. It's great for our brains too." ]}
                        colour="blue"
                        style={{ display: ((status === 'EdSister') ? 'block' : 'none'), position: 'absolute', top: '-10%', left: '-11%', fontWeight: 'bold' }} />

                    <InfoBox
                        title=""
                        text={[ "Ed is... eating well! Your brain needs a mixture of healthy foods to stay in great shape." ]}
                        colour="blue"
                        style={{ display: ((status === 'Ed') ? 'block' : 'none'), position: 'absolute', top: '2%', right: '-15%', fontWeight: 'bold' }} />

                    <InfoBox
                        title=""
                        text={[ "The puppy is... sleeping! Sleep is one of most important ways to look after ourselves." ]}
                        colour="blue"
                        style={{ display: ((status === 'Puppy') ? 'block' : 'none'), position: 'absolute', top: '70%', right: '-5%', fontWeight: 'bold' }} />
                </div>
            </div>
        </div>
    );
}
export default Activity10;

export type {
    IToggleActivityProps
}