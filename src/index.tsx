import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Activity1 from './Modules/Module1/Activity1/Activity1';
import Activity2 from './Modules/Module1/Activity2/Activity2';
import Activity3 from './Modules/Module1/Activity3/Activity3';
import Activity4 from './Modules/Module1/Activity4/Activity4';
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
            <Video width={100} height={100} character="Chloe" transitionTo={transitionTo} borderColour="red" close={false} />
            <Activity2 onSatisfiedCondition={finished} onValidate={validate} />
        </>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);