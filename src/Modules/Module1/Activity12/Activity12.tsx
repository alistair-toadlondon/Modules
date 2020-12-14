import React, { useState } from 'react';
import { SVG } from '../../components/svg/svg';
import useSound from 'use-sound';
import IActivityProps from '../../IActivityProps';
import { callbackify } from 'util';
const startMP3 = require('../../assets/start.mp3');

interface IToggleActivityProps {
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity12: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({ inProgressCondition, doneCondition, onSatisfiedCondition, onValidate }:IToggleActivityProps & IActivityProps) => {
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
                How are our brains protected?
            </div>
            <div className="module moduleRow">
                <div className="cards cardsCols">
                    <div className={ status.indexOf('1') > -1 ? 'flipLR' : 'flipLR flipped' }>
                        <div className="back roundCard" onClick={() => flip('1', null)}>
                            <section>
                                <section>
                                    <SVG src="chloe_bike.svg" style={{ width: '100%', height: '100%' }} />
                                </section>
                            </section>
                            <p>Helmet</p>
                        </div>
                        <div className="front roundCard" style={{ backgroundImage: 'unset' }} onClick={() => flip('1', null)}>
                            <img src={require(`../../assets/tooltip.png`)} alt="" />
                            <section>
                                <p style={{ marginTop: 'calc(50% - 50px)', color: '#fff' }}>That's right sometimes<br />
                                    we need a bit of extra<br />
                                    protection</p>
                            </section>
                            <p>Helmet</p>
                        </div>
                    </div>
                </div>

                <div className="cards cardsCols">
                    <div className={ status.indexOf('2') > -1 ? 'flipLR' : 'flipLR flipped' }>
                        <div className="back roundCard" onClick={() => flip('2', null)}>
                            <section>
                                <section>
                                    <SVG src="chloe_skull.svg" style={{ width: '100%', height: '100%' }} />
                                </section>
                            </section>
                            <p>Skull</p>
                        </div>
                        <div className="front roundCard" style={{ backgroundImage: 'unset' }} onClick={() => flip('2', null)}>
                            <img src={require(`../../assets/tooltip.png`)} alt="" />
                            <section>
                                <p style={{ marginTop: 'calc(50% - 50px)', color: '#fff' }}>The skull is part of the human<br />
                                    skeleton and helps to protect<br />
                                    our amazing brains</p>
                            </section>
                            <p>Skull</p>
                        </div>
                    </div>
                </div>

                <div className="cards cardsCols">
                    <div className={ status.indexOf('3') > -1 ? 'flipLR' : 'flipLR flipped' }>
                        <div className="back roundCard" onClick={() => flip('3', null)}>
                            <section>
                                <section>
                                    <SVG src="chloe_sleep.svg" style={{ width: '100%', height: '100%' }} />
                                </section>
                            </section>
                            <p>Sleep</p>
                        </div>
                        <div className="front roundCard" style={{ backgroundImage: 'unset' }} onClick={() => flip('3', null)}>
                            <img src={require(`../../assets/tooltip.png`)} alt="" />
                            <section>
                                <p style={{ marginTop: 'calc(50% - 50px)', color: '#fff' }}>Sleep helps look after<br />
                                    our brain too! We'll find<br />
                                    out more very soon...</p>
                            </section>
                            <p>Sleep</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Activity12;

export type {
    IToggleActivityProps
}