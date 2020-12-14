import React, { useState, useCallback } from 'react';
import { SVG } from '../svg/svg';
import update from 'immutability-helper';
import './styles.css';

interface ChooseItemState {
    name: string;
    target: string;
    image: string;
    style: React.CSSProperties;
}

export interface ChooseProps {
    items: any;
    background: string;
    callback: any;
    finished: any;
}

export const Choose: React.FC<ChooseProps> = ({ items, background, callback, finished }) => {
    const [status, setStatus] = useState(-1);
    const [fade1Status, setFade1Status] = useState('out');
    const [fade2Status, setFade2Status] = useState('out');
    const [header1, setHeader1] = useState('');
    const [header2, setHeader2] = useState('');

    const itemStyle = (item: any, i: number) => {
        let style: any = {};
        style.width = item.size.width;
        style.height = item.size.height;

        if (i === 1 && items.length === 2) {
            style.top = 'calc(50% - ' + (parseInt(item.size.height.replace(/\D/g, ''), 10) / 2) + 'px)';
            style.left = '10%';
        } else if (i === 1) {
            style.bottom = '10%';
            style.left = 'calc(50% - ' + (parseInt(item.size.width.replace(/\D/g, ''), 10) / 2) + 'px)';
        }

        if (i === 2 && items.length === 2) {
            style.top = 'calc(50% - ' + (parseInt(item.size.height.replace(/\D/g, ''), 10) / 2) + 'px)';
            style.right = '10%';
        } else if (i === 2) {
            style.top = 'calc(50% - ' + (parseInt(item.size.height.replace(/\D/g, ''), 10) / 2) + 'px)';
            style.left = '10%';
        }

        if (i === 3) {
            style.top = 'calc(50% - ' + (parseInt(item.size.height.replace(/\D/g, ''), 10) / 2) + 'px)';
            style.right = '10%';
        }

        if (i === 4) {
            style.top = '10%';
            style.left = 'calc(50% - ' + (parseInt(item.size.width.replace(/\D/g, ''), 10) / 2) + 'px)';
        }

        return style;
    }

    const update = (target: string) => {
        let i = 0, myTarget = -1;
        for (const item of chooseItems) {
            if (item.target === target) myTarget = i;
            i += 1;
        }
        if (myTarget === items.length - 1) finished();

        setStatus(myTarget);
    }

    const showTarget = (target: number) => {     // useState doesn't seem to like arrays...
        return target <= status;
    }

    const fadeEffect = (num: number) => {
        if (num === 1) {
            if (fade1Status === 'in') {
                return 'moduleHeadline fadein';
            } else if (fade1Status === 'out') {
                return 'moduleHeadline fadeout';
            }
        } else if (num === 2) {
            if (fade2Status === 'in') {
                return 'moduleHeadline fadein';
            } else if (fade2Status === 'out') {
                return 'moduleHeadline fadeout';
            }
        }

        return 'moduleHeadline';
    }

    let cItems = [];
    if (header1 === '') {
        let i = 0;
        for (const item of items) {
            i++;
            cItems.push({
                name: item.name,
                target: item.target,
                image: item.image,
                style: itemStyle(item, i)
            });

            let t = 3000; if (i === 1) t = 1000;
            setTimeout(() => {
                setFade1Status('out');
                setTimeout(() => {
                    setHeader1(item.name);
                    setFade1Status('in');
                    setHeader2('');
                    update(item.target);

                    setFade2Status('out');
                    setTimeout(() => {
                        setHeader2(item.target);
                        setFade2Status('in');
                    }, 700);
                }, 1000);
            }, (t * i));
            /*setTimeout(() => {
                setHeader2(item.target);
            }, (2000 * i) + 700);*/
        }
    }
    const [chooseItems, setChooseItems] = useState<ChooseItemState[]>(cItems);

    return (
        <div className="container">
            {chooseItems.map(({ name, target, image, style }, index) => (
                <div key={index} className={ showTarget(index) ? 'chooseItem pop popup' : 'chooseItem pop' } style={{ ...style }}>
                    {(image.substr(image.lastIndexOf('.') + 1) === 'svg') && (
                        <SVG src={image} style={style} />
                    )}
                    {(image.substr(image.lastIndexOf('.') + 1) !== 'svg') && (
                        <img src={require(`./${image}`)} alt="" />
                    )}
                </div>
            ))}

            <div className={ fadeEffect(1) } style={{ height: '65px' }}>{header1}</div>
            <div className={ fadeEffect(2) } style={{ height: '65px' }}>
                {header2 !== '' && (<>Move to <span className="magenta">spot {header2}!</span></>)}
            </div>
        </div>
    );
}