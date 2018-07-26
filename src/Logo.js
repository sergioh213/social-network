import React, {Component} from 'react'

function Logo() {
    return (
        <div id="logo">
            <h1 className="header">Home</h1>

            <img id="small-logo" src="/content/leafs-icon.ico" alt="" />

            <div className="contex-box">
                <h3 id="log-out"><a href="/logout">Log out</a></h3>
            </div>
        </div>
    )
}

export default Logo
