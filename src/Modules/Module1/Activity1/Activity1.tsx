import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DragDrop } from '../../components/dragdrop/dragdrop';
import { SVG } from '../../components/svg/svg';
import { InfoBox } from '../../components/infobox/infobox';
import IActivityProps from '../../IActivityProps';

interface IToggleActivityProps {
    inProgressCondition?: boolean;
    doneCondition?: boolean;
}

const Activity1: React.FunctionComponent<IToggleActivityProps & IActivityProps> = ({ inProgressCondition, doneCondition, onSatisfiedCondition, onValidate }:IToggleActivityProps & IActivityProps) => {
    var items = [
        { name: 'FRONTAL_LOBE', size: { width: '264px', height: '239px' }, startPos: { X: '-380px', Y: '-200px' }, endPos: { X: '10px', Y: '12px' }, image: 'frontal_lobe.svg', dropped: false },
        { name: 'PARIETAL', size: { width: '137px', height: '118px' }, startPos: { X: '-380px', Y: '100px' }, endPos: { X: '233px', Y: '27px' }, image: 'occipital_lobe.svg', dropped: false },
        { name: 'TEMPORAL_LOBE', size: { width: '169px', height: '125px' }, startPos: { X: '-380px', Y: '350px' }, endPos: { X: '207px', Y: '134px' }, image: 'temporal_lobe.svg', dropped: false },
        { name: 'OCCIPITAL_LOBE', size: { width: '39px', height: '102px' }, startPos: { X: '-100px', Y: '-100px' }, endPos: { X: '365px', Y: '107px' }, image: 'cerebelum.svg', dropped: false },
        { name: 'CEREBELLUM', size: { width: '136px', height: '83px' }, startPos: { X: '-180px', Y: '100px' }, endPos: { X: '244px', Y: '210px' }, image: 'medula.svg', dropped: false },
        { name: 'BRAIN_STEM', size: { width: '77px', height: '123px' }, startPos: { X: '-130px', Y: '320px' }, endPos: { X: '188px', Y: '249px' }, image: 'brain_stem.svg', dropped: false }
    ];

    const [lastDropped, setLastDropped] = useState('');
    const itemDropped = (item: string) => {
        setLastDropped(item);
    }

    const finished = (event: any) => {
        onSatisfiedCondition(event);
    }

    return (
        <div className="module moduleColumn">{/*1280 X 1024*/}
            <div className="moduleHeadline">
                Drag and match the different parts<br />
                of the brain to learn more!
            </div>
            <div className="module moduleRow" style={{ overflow: 'visible' }}>
                <DndProvider backend={HTML5Backend}>
                    <div style={{ width: '415px', height: '384px', margin: 'auto' }}>
                        <SVG src={'brain.svg'} style={{ position: 'absolute', /*left: 'calc(50% - 207px)', top: 'calc(50% - 192px)',*/ zIndex: 3 }} />
                        <DragDrop items={items} background={''} callback={itemDropped} finished={finished} />
                    </div>

                    <div className="infoBoxContainer">
                        <InfoBox
                            title="Frontal Lobe"
                            text={[ "This part of the brain is really important for thinking, memory and behaviour. It’s used for making decisions.",
                                    "Would you rather read a book or go for a walk?" ]}
                            colour="yellow"
                            style={{ display: ((lastDropped === 'FRONTAL_LOBE') ? 'block' : 'none') }} />

                        <InfoBox
                            title="Parietal"
                            text={[ "This part makes sense of what we touch and taste, so it helps you know whether your dinner is yummy or yucky!",
                                    "Find something smooth, find something rough and touch them at the same time. Your brain will help you notice the difference." ]}
                            colour="red"
                            style={{ display: ((lastDropped === 'PARIETAL') ? 'block' : 'none') }} />

                        <InfoBox
                            title="Temporal lobe"
                            text={[ "This is really important for sound, speech and long-term memory. Next week when you are tried to remember what you learnt in CUES-Ed today, this part of your brain will be working very hard.",
                                    "Have a think, who was your first teacher?" ]}
                            colour="blue"
                            style={{ display: ((lastDropped === 'TEMPORAL_LOBE') ? 'block' : 'none') }} />

                        <InfoBox
                            title="Occipital Lobe"
                            text={[ "This is in charge of processing information from your eyes, extremely quickly. It will be working very hard right now. Ever heard of the phrase ‘I’ve got eyes in the back of my head’?! This is where it comes from!",
                                    "How many parts of the brain can you count?" ]}
                            colour="green"
                            style={{ display: ((lastDropped === 'OCCIPITAL_LOBE') ? 'block' : 'none') }} />

                        <InfoBox
                            title="Cerebellum"
                            text={[ "This is in charge of balance and co-ordination.",
                                    "Stand on one leg if you can. Can you tap your head with one hand and rubyour tummy with the other? Have a go. Swap. Was one side easier than the other?" ]}
                            colour="magenta"
                            style={{ display: ((lastDropped === 'CEREBELLUM') ? 'block' : 'none') }} />

                        <InfoBox
                            title="Brain Stem"
                            text={[ "The brain stem is in charge of breathing, heartbeat and temperature. It keeps you alive without you even having to think about it." ]}
                            colour="orange"
                            style={{ display: ((lastDropped === 'BRAIN_STEM') ? 'block' : 'none') }} />
                    </div>
                </DndProvider>
            </div>
        </div>
    );
}
export default Activity1;

export type {
    IToggleActivityProps
}