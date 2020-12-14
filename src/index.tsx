import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Activity1 from './Modules/Module1/Activity1/Activity1';
import Activity2 from './Modules/Module1/Activity2/Activity2';
import Activity3 from './Modules/Module1/Activity3/Activity3';
import Activity4 from './Modules/Module1/Activity4/Activity4';
import Activity5 from './Modules/Module1/Activity5/Activity5';
import Activity6 from './Modules/Module1/Activity6/Activity6';
import Activity7 from './Modules/Module1/Activity7/Activity7';
import Activity8 from './Modules/Module1/Activity8/Activity8';
import Activity9 from './Modules/Module1/Activity9/Activity9';
import Activity10 from './Modules/Module1/Activity10/Activity10';
import Activity11 from './Modules/Module1/Activity11/Activity11';
import Activity12 from './Modules/Module1/Activity12/Activity12';
import { Video } from './Modules/components/video/video';
import './Modules/styles.css';
import './Modules/animation.css';

function App() {
    const [transitionTo, setTransitionTo] = useState('');

    const finished = () => {
        //alert('DONE');
    }

    const validate = (condition: any) => {
        if (condition) {
            setTransitionTo('happy');
        } else {
            setTransitionTo('sad');
        }
    }

    return (
        <>
            {/*<Video width={100} height={100} character="Chloe" transitionTo={transitionTo} borderColour="red" close={true} />*/}
            <Activity12 onSatisfiedCondition={finished} onValidate={validate} />
        </>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);