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
        const { first_name, last_name, id, image, bio, showBio, toggleShowBio, showUploader, hideUploader, setBio } = this.props
        return (
            <div id="profile">
                <h1>Your profile info</h1>
                <ProfilePic
                    image= { image }
                    firstName= { first_name }
                    lastName= { last_name }
                    clickHandler= { showUploader }
                />
                <h3>{ `${ first_name } ${ last_name }` }</h3>

                { bio
                    ? <p>{ bio } <span onClick={ toggleShowBio }>Edit</span> </p>
                    : <p onClick={ toggleShowBio }>Click here to write a bio</p>
                }

                { showBio && <textarea onChange={ this.handleChange } name="bio" id="" cols="30" rows="10"></textarea> }

                { showBio && <button onClick={ () => setBio(this.state.bio) }>SAVE</button> }

                <Logo currentPage={`YOUR PROFILE`} />

            </div>
        )
    }
}

export default Profile
