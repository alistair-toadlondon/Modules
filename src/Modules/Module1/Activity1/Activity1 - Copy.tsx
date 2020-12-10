import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragDrop } from '../../components/dragdrop/dragdrop';
import { SVG } from '../../components/svg/svg';
import IActivityProps from '../../IActivityProps';

interface IToggleActivityProps { 
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity1: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({inProgressCondition, doneCondition, onSatisfiedCondition }:IToggleActivityProps & IActivityProps) => {
    var items = [
        { name: 'FRONTAL_LOBE', size: { width: '264px', height: '239px' }, startPos: { X: '-380px', Y: '-200px' }, endPos: { X: '10px', Y: '12px' }, image: 'frontal_lobe.svg', dropped: false },
        { name: 'PARIETAL', size: { width: '137px', height: '118px' }, startPos: { X: '-380px', Y: '100px' }, endPos: { X: '233px', Y: '27px' }, image: 'occipital_lobe.svg', dropped: false },
        { name: 'TEMPORAL_LOBE', size: { width: '169px', height: '125px' }, startPos: { X: '-380px', Y: '350px' }, endPos: { X: '207px', Y: '134px' }, image: 'temporal_lobe.svg', dropped: false },
        { name: 'OCCIPITAL_LOBE', size: { width: '39px', height: '102px' }, startPos: { X: '-100px', Y: '-100px' }, endPos: { X: '365px', Y: '107px' }, image: 'cerebelum.svg', dropped: false },
        { name: 'CEREBELLUM', size: { width: '136px', height: '83px' }, startPos: { X: '-180px', Y: '100px' }, endPos: { X: '244px', Y: '210px' }, image: 'medula.svg', dropped: false },
        { name: 'BRAIN_STEM', size: { width: '77px', height: '123px' }, startPos: { X: '-130px', Y: '320px' }, endPos: { X: '188px', Y: '249px' }, image: 'brain_stem.svg', dropped: false }
    ];
    
    const [lastDropped, setLastDropped] = React.useState('');
    const itemDropped = (item: string) => {
        setLastDropped(item);
    }
    
    const finished = (event: any) => {
        onSatisfiedCondition(event);
    }

    return (
        <div className="module">{/*1280 X 1024*/}
            <DndProvider backend={HTML5Backend}>
                <div style={{ border: '1px dashed #ccc'/*, background: 'url("' + require(`./assets/brain.svg`) + '") no-repeat center center'*/ }}>
                    <SVG src={'brain.svg'} style={{ position: 'absolute', left: 'calc(50% - 207px)', top: 'calc(50% - 192px)', zIndex: 3 }} />

                    <DragDrop items={items} background={''} callback={itemDropped} finished={finished} />

                    <div className="infoBoxContainer">
                        <div className="infoBox blackText" style={{ display: ((lastDropped === 'FRONTAL_LOBE') ? 'block' : 'none'), background: '#b6a800' }}>
                            <div style={{ background: '#ffec00' }}>
                                <h2>Frontal Lobe</h2>
                                <p>This part of the brain is really important for thinking, memory and behaviour. It’s used for making decisions.</p>
                                <p>Would you rather read a book or go for a walk?</p>
                            </div>
                        </div>
                        <div className="infoBox whiteText" style={{ display: ((lastDropped === 'PARIETAL') ? 'block' : 'none'), background: '#961410' }}>
                            <div style={{ background: '#d41c17' }}>
                                <h2>Parietal</h2>
                                <p>This part makes sense of what we touch and taste, so it helps you know whether your dinner is yummy or yucky!</p>
                                <p>Find something smooth, find something rough and touch them at the same time. Your brain will help you notice the difference.</p>
                            </div>
                        </div>
                        <div className="infoBox whiteText" style={{ display: ((lastDropped === 'TEMPORAL_LOBE') ? 'block' : 'none'), background: '#0070a0' }}>
                            <div style={{ background: '#009ee2' }}>
                                <h2>Temporal lobe</h2>
                                <p>This is really important for sound, speech and long-term memory. Next week when you are tried to remember what you learnt in CUES-Ed today, this part of your brain will be working very hard.</p>
                                <p>Have a think, who was your first teacher?</p>
                            </div>
                        </div>
                        <div className="infoBox blackText" style={{ display: ((lastDropped === 'OCCIPITAL_LOBE') ? 'block' : 'none'), background: '#688816' }}>
                            <div style={{ background: '#93c01f' }}>
                                <h2>Occipital Lobe</h2>
                                <p>This is in charge of processing information from your eyes, extremely quickly. It will be working very hard right now. Ever heard of the phrase ‘I’ve got eyes in the back of my head’?! This is where it comes from!</p>
                                <p>How many parts of the brain can you count?</p>
                            </div>
                        </div>
                        <div className="infoBox whiteText" style={{ display: ((lastDropped === 'CEREBELLUM') ? 'block' : 'none'), background: '#a30059' }}>
                            <div style={{ background: '#e5007e' }}>
                                <h2>Cerebellum</h2>
                                <p>This is in charge of balance and co-ordination.</p>
                                <p>Stand on one leg if you can. Can you tap your head with one hand and rubyour tummy with the other? Have a go. Swap. Was one side easier than the other?</p>
                            </div>
                        </div>
                        <div className="infoBox whiteText" style={{ display: ((lastDropped === 'BRAIN_STEM') ? 'block' : 'none'), background: '#a95900' }}>
                            <div style={{ background: '#ee7d00' }}>
                                <h2>Brain Stem</h2>
                                <p>The brain stem is in charge of breathing, heartbeat and temperature. It keeps you alive without you even having to think about it.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </DndProvider>
        </div>
    );
}
export default Activity1;

export type {
    IToggleActivityProps
}