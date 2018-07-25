import React from 'react'
import Registration from './Registration'
import Login from './Login'
// import Logo from './Logo'
import { HashRouter, Route, Link } from 'react-router-dom'

// <Link to="/login">Log in</Link>

function Welcome() {
    return (
        <div className="big-momma-component">
            <div id="navheader">
                <div className="nav-item">
                  <a href="/signers">SIGNER'S LIST</a>
                </div>
                <div className="nav-item">
                  <a href="/profile">PROFILE</a>
                </div>
                <div className="nav-item">
                  <a href="/readMore">PETITION</a>
                </div>
                <div className="nav-item">
                  <a href="/thanks">SIGNATURE</a>
                </div>
                <div className="nav-item">
                  <a href="/logout">LOGOUT</a>
                </div>
            </div>
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration}></Route>
                    <Route exact path="/login" component={Login}></Route>
                </div>
            </HashRouter>
        </div>
    )
}

export default Welcome
