import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Login from './Form';

function App() {
    return (
        <div>
            <Login />
        </div>
    )
}
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement)