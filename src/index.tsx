/* eslint-disable @typescript-eslint/no-var-requires */
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { client } from './apollo-client';
import { ApplicationSettingsProvider } from './context/settings';

if (process.env.NODE_ENV === 'development') {
    const whyDidYouRender = require('@welldone-software/why-did-you-render');
    const React = require('react');
    whyDidYouRender(React, {
        trackAllPureComponents: true,
        include: [/^App/],
        exclude: [/^Router/, /^Link/, /^Route/, /^Button$/],
    });
}

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);

root.render(
    <React.StrictMode>
        <ApolloProvider client={client}>
            <BrowserRouter>
                <ApplicationSettingsProvider>
                    <App />
                </ApplicationSettingsProvider>
            </BrowserRouter>
        </ApolloProvider>
    </React.StrictMode>,
);

reportWebVitals();
