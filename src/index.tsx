import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {transitions, positions, Provider as AlertProvider} from "react-alert";
import AlertTemplate from "./assets/alertTemplates/template";

const alertOptions = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '10px',
    transition: transitions.FADE
}

ReactDOM.render(
    <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
            <App />
        </AlertProvider>
    </BrowserRouter>

    , document.getElementById('root'));
