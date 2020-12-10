import React from 'react';
import ReactDOM from 'react-dom';
import Activity1 from './Modules/Module1/Activity1/Activity1';
import Activity2 from './Modules/Module1/Activity2/Activity2';
import Activity3 from './Modules/Module1/Activity3/Activity3';
import './Modules/styles.css';
import './Modules/animation.css';

function App() {
    const finished = () => {
        alert('DONE');
    }

    const validate = () => {
    }

    return (
        <Activity2 onSatisfiedCondition={finished} onValidate={validate} />
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);