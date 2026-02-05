import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './i18n'; // Initialize i18n

export function render() {
    const helmetContext: any = {};

    const html = ReactDOMServer.renderToString(
        <HelmetProvider context={helmetContext}>
            <App />
        </HelmetProvider>
    );
    return { html, helmet: helmetContext.helmet };
}
