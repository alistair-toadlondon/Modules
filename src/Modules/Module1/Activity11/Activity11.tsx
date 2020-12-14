import React, { useState } from 'react';
import { SVG } from '../../components/svg/svg';
import useSound from 'use-sound';
import IActivityProps from '../../IActivityProps';
const startMP3 = require('../../assets/start.mp3');

interface IToggleActivityProps {
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity11: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({ inProgressCondition, doneCondition, onSatisfiedCondition, onValidate }:IToggleActivityProps & IActivityProps) => {
    const [status, setStatus] = useState(['']);

    const flip = (num: string, event: any) => {
        playStart();
        let arr = [...status];
        if (arr.indexOf(num) > -1) {
            arr.splice(status.indexOf(num), 1);
        } else {
            arr.push(num);
        }
        setStatus(arr);
        if (arr.length === 5) onSatisfiedCondition(event);
    }

    const [playStart] = useSound(startMP3);

    return (
        <div className="module moduleColumn">
            <div className="moduleHeadline">
                <div className={ status.indexOf('1') > -1 ? 'fadeout' : 'fadein' } style={{ height: 0 }}>
                    Fun Brain Facts!<br />
                    <span className="magenta">Out brains aren't actually multi-coloured!</span>
                </div>
                <div className={ status.indexOf('1') > -1 ? 'fadein' : 'fadeout' } style={{ height: 0, marginTop: '30px' }}>
                    What colour is the brain?
                </div>
            </div>
            <div className="module moduleRow">
                <div className="cards">
                    <div className={ status.indexOf('1') > -1 ? 'flipLR' : 'flipLR flipped' }>
                        <div className="back" onClick={() => flip('1', null)}>
                            <SVG src="brain_complete.svg" />
                        </div>
                        <div className="front" onClick={() => flip('1', null)}>
                            <img src={require(`../../assets/real_brain.jpg`)} alt="" style={{ maxHeight: '100%' }} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Activity11;

export type {
    IToggleActivityProps
}