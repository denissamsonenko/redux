import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css'
import store from './store'
import App from './App'
import {Provider} from "react-redux";

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode>
);
