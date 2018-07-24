import React from 'react';
import ReactDOM from 'react-dom';
import Welcome from './Welcome'
import Logo from './Logo'

let component

if (location.pathname == "/welcome") {
    component = <Welcome />
} else {
    component = <Logo />
}

ReactDOM.render(
    component,
    document.querySelector('main')
);
