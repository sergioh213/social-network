import React from 'react'

function ProfilePic (props) {
    return (
        <div id="profile-pic-div">
            <img id="profile-pic"
                src={ props.image }
                alt={ `${props.firstName} ${props.lastName}` }
                onClick={ props.clickHandler }
            />
        </div>
    )
}

export default ProfilePic
