import React, {Component} from 'react'

function Friends(props) {

    this.props.friends.map(
        friend => (
            <div key={friend.id} className="friend">
            </div>
        )
    )

    // return (
    //     <div id="logo">
    //         <img id="small-logo" src="/content/leafs-icon.ico" alt="" />
    //     </div>
    // )
}

export default Friends
