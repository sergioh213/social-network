import React from 'react'
import Registration from './Registration'
import Login from './Login'
import Nav from './Nav'
// import Logo from './Logo'
import { HashRouter, Route, Link } from 'react-router-dom'

// <Link to="/login">Log in</Link>

function Welcome() {
    return (
        <div className="big-momma-component">
            <Nav />
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
