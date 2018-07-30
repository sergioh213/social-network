import React from 'react'

function ProfilePic (props) {
    console.log("LOGGED IN USER'S profile pic:", props);
    return (
        <div id="profile-pic-div">
            <img id="profile-pic"
                src={ props.image }
                alt={ `${props.first_name} ${props.last_name}` }
                onClick={ props.clickHandler }
            />
            <h2 id='profile-name'>{ `${props.first_name} ${props.last_name}` }</h2>
        </div>
    )
}

export default ProfilePic
