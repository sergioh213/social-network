import React, {Component} from 'react'
import Logo from './Logo'
import axios from './axios'
import Profile from './Profile'
import Nav from './Nav'
import Opp from './Opp'
import Uploader from './Uploader'
import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showBio: false
        }

        this.setBio = this.setBio.bind(this)
        this.toggleShowBio = this.toggleShowBio.bind(this)
        this.setImage = this.setImage.bind(this)
        this.showUploader = this.showUploader.bind(this)
        this.hideUploader = this.hideUploader.bind(this)
    }
    setBio(value) {
        axios.post("/bio", {bio : value}).then(
            ({data}) => {
                this.setState({bio: data.bio})
            }
        )
    }
    showUploader() {
        this.setState({
            uploaderIsVisible: true
        })
    }
    hideUploader() {
        this.setState({
            uploaderIsVisible: false
        })
    }
    setImage(url) {
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
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                this.setState(data)
            }
        )
    }
    render() {
        var logout = {
            position: 'absolute',
            bottom: 20
        }
        const { first_name, last_name, id, image, bio, showBio } = this.state
        if (!this.state.id) {
            return (
                <div id="loading-screen">
                    <h3 id="loading-message">Loading...</h3>
                    <img id="loading-img" src="/content/progressBar.gif" />
                </div>
            )
        }
        return (
            <div id="app">
                <Nav />
                <BrowserRouter>
                    <div>
                        <Route exact path='/profile' render={ () => (
                            <Profile
                                image={ image }
                                first_name={ first_name }
                                last_name={ last_name }
                                id={ id }
                                bio={ bio }
                                showBio={ showBio }
                                toggleShowBio={ this.toggleShowBio }
                                setBio={ this.setBio }
                                showUploader={ this.showUploader }
                                hideUploader={ this.hideUploader }
                            />
                        ) } />
                        { this.state.uploaderIsVisible && <Uploader setImage={ this.setImage } hideUploader={ this.hideUploader }/> }
                        <Route exact path='/user/:id' component={Opp} />
                    </div>
                </BrowserRouter>
                <div style={logout} className="contex-box">
                    <h3 id="log-out"><a href="/logout">Log out</a></h3>
                </div>
            </div>
        )
    }
}

export default App
