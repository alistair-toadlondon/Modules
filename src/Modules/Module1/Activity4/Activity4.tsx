import React, { useState } from 'react';
import { SVG } from '../../components/svg/svg';
import useSound from 'use-sound';
import IActivityProps from '../../IActivityProps';
const yesMP3 = require('../../assets/yes.mp3');
const timerMP3 = require('../../assets/timer.mp3');

interface IToggleActivityProps {
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity4: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({ inProgressCondition, doneCondition, onSatisfiedCondition, onValidate }:IToggleActivityProps & IActivityProps) => {
    const [status, setStatus] = useState('');
    const [timer, setTimer] = useState(0);

    let start = 0,
        end = 100000000000,
        period = 10,
        steps = Math.ceil(Math.pow((end - start), 1/3)) / 2,
        iterations = -1,
        stepSize = ((end - start) / steps),
        interval = Math.floor((period * 1000) / steps);

    const formatNumber = (num: any) => {
        let result = '';
        num = Math.ceil(num).toString();
        for (var i = num.length - 1; i >= 0; i--) {
          result = (((num.length - i) % 3 == 0 && result != '' && i != 0) ? ',' : '') + num[i] + result;
        }
        return result;
    }

    const startTimer = (event: any) => {
        if (status === 'running') return;
        runTimer(event);
        setStatus('running');
        //playStart();
        //onValidate!(false);
    }

    const runTimer = (event: any) => {
        if (start + (stepSize * 2) < end) {     // Stop 1 step early for dramatic effect...
            start += stepSize;
            setTimer(start);
            iterations += 1;

            var i = interval;
            if (iterations / steps > 0.95)  {
                i = i * Math.ceil(Math.pow((iterations / steps) - 0.95, 1/3) * 100);
            }
        
            // Different easing experiments
            //i = Math.floor(interval + ((iterations / steps) * (interval * 2)));     // Basic easing
            //i = interval + ((/*3.5 -*/ (1 / (0.3 * Math.pow(Math.E, (5 * (iterations / steps)))))) * interval);
            //i = (Math.sin(Math.PI * (iterations / steps)) / interval);// * itemW;
            //i = interval + (Math.sin(Math.PI * (iterations / steps)) * interval);
        
            setTimeout(() => { runTimer(event); }, i);
        } else {
            setTimeout(() => {
                setTimer(end);
                stop();
                //playYes();
                onSatisfiedCondition(event);
            }, 700);
        }
    }

    const timerSegment = (num: number) => {
        var arr = formatNumber(Math.ceil(timer)).split(',').reverse();
        if (arr[num - 1]) {
            if (num == arr.length) return arr[num - 1];
            return ('000' + arr[num - 1]).substr(arr[num - 1].length);
        }
        return '';
    }

    const timerSpacer = () => {
        let num:string = '';
        for (var i = 0; i < Math.ceil(timer).toString().length; i++) { num += '8'; }
        return formatNumber(parseInt(num, 10));
    }

    const [playStart, { stop }] = useSound(timerMP3);
    const [playYes] = useSound(yesMP3);

    return (
        <div className="module moduleColumn">
            <div className="moduleHeadline">
                How many <span className="magenta">neurons</span> do you think<br />
                we have in our brains?
            </div>
            <div className="module moduleRow">
                <div style={{ clipPath: 'circle(120px at center)', cursor: 'pointer' }} onClick={startTimer}>
                    <SVG src="neurons.svg" style={{ width: '411px', height: '291px', margin: '47px 0 0 -14px' }} />
                </div>
            </div>
            <div className="module moduleHeadline" style={{ padding: 0, height: '60%' }}>
                <div className="star" style={{ right: '30%', top: '10%', transform: 'rotate(0deg)' }}><SVG src="star.svg" className="twinkle3" /></div>
                <div className="star" style={{ left: '10%', top: '10%', transform: 'rotate(20deg)' }}><SVG src="star.svg" className="twinkle1" /></div>
                <div className="star" style={{ right: '20%', top: '60%', transform: 'rotate(30deg)' }}><SVG src="star.svg" className="twinkle3" /></div>
                <div className="star" style={{ left: '40%', top: '10%', transform: 'rotate(50deg)' }}><SVG src="star.svg" className="twinkle2" /></div>
                <div className="star" style={{ right: '10%', top: '30%', transform: 'rotate(10deg)' }}><SVG src="star.svg" className="twinkle3" /></div>
                <div className="star" style={{ left: '30%', top: '50%', transform: 'rotate(15deg)' }}><SVG src="star.svg" className="twinkle4" /></div>

                {/*<h1 className="magenta" style={{ display: 'inline-block', textAlign: 'left' }}>
                    {formatNumber(timer)}
                    <div style={{ height: 0, overflow: 'hidden', visibility: 'hidden' }}>{timerSpacer()}</div>
                </h1>*/}

                <table className="counter">
                    <tr>
                        <td style={{ display: timer > 999999999999 ? 'table-cell' : 'none' }}>{timerSegment(5)}</td>
                        <td style={{ display: timer > 999999999999 ? 'table-cell' : 'none' }}>,</td>
                        <td style={{ display: timer > 999999999 ? 'table-cell' : 'none' }}>{timerSegment(4)}</td>
                        <td style={{ display: timer > 999999999 ? 'table-cell' : 'none' }}>,</td>
                        <td style={{ display: timer > 999999 ? 'table-cell' : 'none' }}>{timerSegment(3)}</td>
                        <td style={{ display: timer > 999999 ? 'table-cell' : 'none' }}>,</td>
                        <td style={{ display: timer > 999 ? 'table-cell' : 'none' }}>{timerSegment(2)}</td>
                        <td style={{ display: timer > 999 ? 'table-cell' : 'none' }}>,</td>
                        <td style={{ display: timer >= 0 ? 'table-cell' : 'none' }}>{timerSegment(1)}</td>
                    </tr>
                    <tr style={{ visibility: 'hidden' }}>
                        <td style={{ display: timer > 999999999999 ? 'table-cell' : 'none' }}>888</td>
                        <td style={{ display: timer > 999999999999 ? 'table-cell' : 'none' }}>,</td>
                        <td style={{ display: timer > 999999999 ? 'table-cell' : 'none' }}>888</td>
                        <td style={{ display: timer > 999999999 ? 'table-cell' : 'none' }}>,</td>
                        <td style={{ display: timer > 999999 ? 'table-cell' : 'none' }}>888</td>
                        <td style={{ display: timer > 999999 ? 'table-cell' : 'none' }}>,</td>
                        <td style={{ display: timer > 999 ? 'table-cell' : 'none' }}>888</td>
                        <td style={{ display: timer > 999 ? 'table-cell' : 'none' }}>,</td>
                        <td style={{ display: timer >= 0 ? 'table-cell' : 'none' }}>{timer == 0 ? '0' : '888'}</td>
                    </tr>
                </table>
            </div>
        </div>
    );
}
export default Activity4;

export type {
    IToggleActivityProps
}