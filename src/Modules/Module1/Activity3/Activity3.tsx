import React, { useState } from 'react';
import { SVG } from '../../components/svg/svg';
import useSound from 'use-sound';
import IActivityProps from '../../IActivityProps';
const startMP3 = require('../../assets/start.mp3');

interface IToggleActivityProps {
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity3: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({ inProgressCondition, doneCondition, onSatisfiedCondition, onValidate }:IToggleActivityProps & IActivityProps) => {
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
            <SVG src="brain_complete.svg" style={{ position: 'absolute', marginTop: '12%' }} />
            <div className="moduleHeadline">
                Why is the brain more <span className="magenta">powerful?</span>
            </div>
            <div className="module moduleRow">
                <div className="cards">
                    <div className={ status.indexOf('1') > -1 ? 'flipLR' : 'flipLR flipped' }>
                        <div className="back clouds1" onClick={() => flip('1', null)}>
                            <p>1</p>
                        </div>
                        <div className="front" onClick={() => flip('1', null)}>
                            <SVG src="computer.svg" />
                            <p>The human brain<br />
                                invented computers!</p>
                        </div>
                    </div>
                </div>
                <div className="cards">
                    <div className={ status.indexOf('2') > -1 ? 'flipRL' : 'flipRL flipped' }>
                        <div className="back clouds2" onClick={() => flip('2', null)}>
                            <p>2</p>
                        </div>
                        <div className="front" onClick={() => flip('2', null)}>
                            <SVG src="lightbulb.svg" />
                            <p>The human brain thinks<br />
                                for itself and has an<br />
                                amazing imagination!</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="module moduleRow">
                <div className="cards">
                    <div className={ status.indexOf('3') > -1 ? 'flipLR' : 'flipLR flipped' }>
                        <div className="back clouds3" onClick={() => flip('3', null)}>
                            <p>3</p>
                        </div>
                        <div className="front" onClick={() => flip('3', null)}>
                            <img src={require(`../../assets/ed_angry.png`)} alt="" style={{ height: '115px' }} />
                            {/*<SVG src="ed_angry.svg" style={{ height: '120px' }} />*/}
                            <p>The human brain can<br />
                                feel emotions a<br />
                                computer can't!</p>
                        </div>
                    </div>
                </div>
                <div className="cards">
                    <div className={ status.indexOf('4') > -1 ? 'flipLR' : 'flipLR flipped' }>
                        <div className="back clouds4" onClick={() => flip('4', null)}>
                            <p>4</p>
                        </div>
                        <div className="front" onClick={() => flip('4', null)}>
                            <SVG src="chloe_taste.svg" style={{ height: '130px' }} />
                            <p>The human brain helps<br />
                                us tast yummy food,<br />
                                even robots can't!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Activity3;

export type {
    IToggleActivityProps
}