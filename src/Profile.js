import React, {Component} from 'react'
import axios from './axios'
import ProfilePic from './ProfilePic'
import Uploader from './Uploader'
import Logo from './Logo'

class Profile extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleChange = this.handleChange.bind(this)
    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                console.log("data as the component mounts: ", data);
                this.setState(data)
            }
        )
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ]: e.target.value
        })
    }
    render() {
        const { first_name, last_name, id, image_url, bio, showBio, toggleShowBio, showUploader, hideUploader, setBio } = this.props
        var profileResizableHeight = 200
        var bioSectionHeight = 92
        var textareaHeight = 210
        var pStyle = {
            padding: 0,
            margin: 0
        }
        if ( showBio == true ) {
            profileResizableHeight = 400
            pStyle.display = "none"
            console.log("bio deployed. changing to profile box height to 400px", profileResizableHeight);
        } else {
            profileResizableHeight = 200
            pStyle.display = "block"
            console.log("else: changing back to profile box height 200px", profileResizableHeight);
        }
        var titleStyle = {
            left: '50%',
            transform: 'translateX(-50%)',
            top: '100px',
            position: 'absolute',
            color: '#5D3440',
            fontWeight: 'bold'
        }
        var profileStyle = {
            position: 'absolute',
            display: 'inline',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '700px',
            marginTop: '200px',
            backgroundColor: '#EDCBB1',
            padding: 0,
            height: profileResizableHeight,
            borderRadius: '19px',
            paddingBottom: 20
        }
        var textBoxStyle = {
            paddingTop: 20,
            paddingRight: '20px',
            paddingLeft: '20px',
            verticalAlign: 'top',
            width: '500px',
            height: '200px',
            position: 'relative',
            display: 'inline-block'
        }
        var sectionHeader = {
            margin: 0,
            color: '#5D3440'
        }
        var nameStyle = {
            margin: 0
        }
        var bioStyle = {
            margin: 0,
            cursor: 'pointer',
            fontSize: '16px'
        }
        var textareaStyle = {
            resize: 'none',
            width: '' + (500 - 20 - 20 - 10 - 10) + 'px',
            height: textareaHeight,
            fontSize: '16px',
            padding: '4px'
        }
        var bioSection = {
            backgroundColor: '#BFB59E',
            padding: '10px',
            marginTop: '10px',
            borderRadius: "0px 8px 8px 0px",
            minHeight: bioSectionHeight
        }
        var editBioButton = {
            fontWeight: 'bold',
            color: '#5D3440',
            cursor: 'pointer'
        }
        var editIcon = {
            // position: 'absolute',
            width: 16,
            height: 16,
            color: 'grey',
            'float': 'right',
            marginRight: 10,
            cursor: 'pointer'
        }
        return (
            <div id="profile" >

                <h1 id="title" style={titleStyle} >YOUR PROFILE</h1>

                <div className="effect1" id="profile-box" style={profileStyle}>
                    <ProfilePic
                        image_url= { image_url }
                        firstName= { first_name }
                        lastName= { last_name }
                        clickHandler= { showUploader }
                    />
                    <div id="text-box" style={textBoxStyle}>
                        <div><i style={ editIcon } className="fas fa-pencil-alt"></i></div>
                        <h3 id="section-header" style={sectionHeader}>Your profile info</h3>
                        <h1 style={nameStyle}>{ `${ first_name } ${ last_name }` }</h1>
                        <div id="bio-section" style={ bioSection }>
                            { bio
                                ? <p style={pStyle}>{ bio } <span style={editBioButton} onClick={ (e) => {
                                    toggleShowBio()
                                    console.log("bio on click", bio);
                                } }>Edit</span> </p>
                                : <p style={bioStyle} onClick={ toggleShowBio }>{ !showBio && "Click here to write a bio" }</p>
                            }

                            { showBio && <textarea style={textareaStyle} onChange={ this.handleChange } name="bio" defaultValue={ bio }></textarea> }

                            { showBio && <button onClick={ () => {
                                    setBio(this.state.bio)
                                    toggleShowBio()
                                } }>SAVE</button>
                            }
                        </div>
                    </div>
                </div>

                <Logo />

            </div>
        )
    }
}

export default Profile
