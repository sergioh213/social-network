import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome'
import Logo from './Logo'
import axios from './axios'

let component

// axios.get("/"){}

if (location.pathname == "/welcome") {
    component = <Welcome />
} else {
    component = <Logo />
}

ReactDOM.render(
    component,
    document.querySelector('main')
);
