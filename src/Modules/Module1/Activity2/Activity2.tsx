import React, { useState } from 'react';
import { SVG } from '../../components/svg/svg';
import useSound from 'use-sound';
import IActivityProps from '../../IActivityProps';
const yesMP3 = require('../../assets/yes.mp3');
const noMP3 = require('../../assets/no.mp3');

interface IToggleActivityProps {
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity2: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({ inProgressCondition, doneCondition, onSatisfiedCondition, onValidate }:IToggleActivityProps & IActivityProps) => {
    const [status, setStatus] = useState('');

    const win = (event: any) => {
        if (status !== 'win') playYes();
        setStatus('win');
        onValidate!(true);
        onSatisfiedCondition(event);
    }

    const loose = (event: any) => {
        if (status !== 'loose') playNo();
        setStatus('loose');
        onValidate!(false);
    }

    const [playYes] = useSound(yesMP3);
    const [playNo] = useSound(noMP3);

    return (
        <div className="module moduleColumn">
            <div className="moduleHeadline">
                Human brain vs. The computer<br />
                <span className="magenta">Which is more powerful?</span>
            </div>
            <div className="module moduleRow">
                <div className={ status === 'loose' ? 'shake' : '' }>
                    <div className="item" style={{ backgroundColor: status === 'loose' ? '#CF1322' : '' }} onClick={loose}>
                        <SVG src="laptop.svg" style={{ width: '411px', height: '291px', margin: '47px 0 0 -14px' }} />
                    </div>
                </div>
                <div className={ status === 'win' ? 'boing' : '' }>
                    <div className="item" style={{ backgroundColor: status === 'win' ? '#89CE8C' : '' }} onClick={win}>
                        <SVG src="brain_complete.svg" style={{ width: '415px', height: '384px', margin: '25px 0 0 -16px' }} />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Activity2;

export type {
    IToggleActivityProps
}