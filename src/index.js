import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Provider} from "react-redux";
import {configureStore} from "@reduxjs/toolkit";
import { transitions, positions, types, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from "react-alert-template-basic";
import playerDataReducer from "./features/PlayerData";

const options = {
    position: positions.BOTTOM_CENTER,
    timeout: 7000,
    offset: '30px',
    transition: transitions.FADE,
    type: types.INFO
}

const store = configureStore({
    reducer: {
        playerData: playerDataReducer,
    }
})

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...options}>
                <App />
            </AlertProvider>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
