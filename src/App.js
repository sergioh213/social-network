import React, {Component} from 'react'
import Logo from './Logo'
import axios from './axios'
import ProfilePic from './ProfilePic'
import Profile from './Profile'
import Uploader from './Uploader'
import Nav from './Nav'
import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showBio: false
        }

        this.showUploader = this.showUploader.bind(this)
        this.setImage = this.setImage.bind(this)
        this.toggleShowBio = this.toggleShowBio.bind(this)
        this.setBio = this.setBio.bind(this)
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        })
    }
    setImage(url) {
        console.log("url in setImage: ", url);
        this.setState({
            uploaderIsVisible: false,
            image: url
        })
    }
    toggleShowBio() {
        this.setState({
            showBio: !this.state.showBio
        })
    }
    setBio(value) {
        axios.post("/bio", {bio : value}).then(
            ({data}) => {
                console.log("bio DATA: ", data.bio);
                this.setState({bio: data.bio})
            }
        )
    }
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                console.log("LOGGING DATA: ", data);
                this.setState(data)
            }
        )
    }
    render() {
        const { firstName, lastName, id, image, bio, showBio } = this.state
        if (!this.state.id) {
            return (<img src="/content/progressBar.gif" />)
        }
        return (
            <div id="app">
                <Nav />
                <ProfilePic
                    image={ this.state.image }
                    first_name={ this.state.first_name }
                    last_name={ this.state.last_name }
                    clickHandler={ this.showUploader }
                />
                <BrowserRouter>
                    <div>
                        <Route path='/profile' render={ () => (
                            <Profile
                                image={ image }
                                first_name={ firstName }
                                last_name={ lastName }
                                id={ id }
                                bio={ bio }
                                showBio={ showBio }
                                toggleShowBio={ this.toggleShowBio }
                                setBio={ this.setBio }
                            />
                        ) } />
                    </div>
                </BrowserRouter>
                <Logo />
                { this.state.uploaderIsVisible && <Uploader setImage={this.setImage} /> }
            </div>
        )
    }
}

export default App
