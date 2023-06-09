import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
    apiKey: 'AIzaSyDnnWqdqukAAvWscuXTLWBRQAdideqZReg',
    authDomain: 'myblogauth-f3356.firebaseapp.com',
    projectId: 'myblogauth-f3356',
    storageBucket: 'myblogauth-f3356.appspot.com',
    messagingSenderId: '550533035977',
    appId: '1:550533035977:web:50831951bae951fcd11a18',
};

const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
