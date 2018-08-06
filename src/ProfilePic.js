import React from 'react'

function ProfilePic (props) {
    var boxStyle = {
        width: '200px',
        height: '200px',
        display: 'inline-block'
    }
    var picStyle = {
        width: '200px',
        height: '200px',
        display: 'inline-block',
        objectFit: 'cover',
        objectPosition: 'center'
    }
    return (
        <div id="profile-pic-div" style={boxStyle}>
            <img id="profile-pic" style={picStyle}
                src={ props.image }
                alt={ `${props.firstName} ${props.lastName}` }
                onClick={ props.clickHandler }
            />
        </div>
    )
}

export default ProfilePic
