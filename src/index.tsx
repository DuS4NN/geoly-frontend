import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/apm';
import {BrowserRouter} from "react-router-dom";
import {transitions, positions, Provider as AlertProvider} from "react-alert";
import AlertTemplate from "./assets/alertTemplates/template";

const alertOptions = {
    position: positions.BOTTOM_CENTER,
    timeout: 5000,
    offset: '10px',
    transition: transitions.FADE
}

Sentry.init({
    dsn: "https://efc1218690c24f2e987b1e1d12afbc8d@o421143.ingest.sentry.io/5400946",
    integrations: [
        new Integrations.Tracing(),
    ],
    tracesSampleRate: 1.0
})

ReactDOM.render(
    <BrowserRouter>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
            <App />
        </AlertProvider>
    </BrowserRouter>

    , document.getElementById('root'));
