import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome'
import axios from './axios'
import App from './App'

let component

// axios.get("/"){}

if (location.pathname == "/welcome") {
    component = <Welcome />
} else {
    component = <App />
}

ReactDOM.render(
    component,
    document.querySelector('main')
);
