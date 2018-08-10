import React, {Component} from 'react'
import Logo from './Logo'
import axios from './axios'
import Profile from './Profile'
import Nav from './Nav'
import Opp from './Opp'
import OnlineNow from './OnlineNow'
import Uploader from './Uploader'
import Friends from './Friends'
import Chat from './Chat'
import { BrowserRouter, Route, Link } from 'react-router-dom'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showBio: false,
            showChat: false,
            showOnline: false
        }

        this.setBio = this.setBio.bind(this)
        this.toggleShowBio = this.toggleShowBio.bind(this)
        this.setImage = this.setImage.bind(this)
        this.showUploader = this.showUploader.bind(this)
        this.hideUploader = this.hideUploader.bind(this)
        this.toggleShowChat = this.toggleShowChat.bind(this)
        this.toggleShowOnline = this.toggleShowOnline.bind(this)
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
    setImage(image_url) {
        this.setState({
            uploaderIsVisible: false,
            image_url: image_url
        })
    }
    toggleShowBio() {
        this.setState({
            showBio: !this.state.showBio
        })
    }
    toggleShowChat() {
        this.setState({
            showChat: !this.state.showChat
        })
    }
    toggleShowOnline() {
        this.setState({
            showOnline: !this.state.showOnline
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
            bottom: 5,
            margin: 0,
            padding: 0,
            marginBottom: 7
        }
        var chatImgStyle = {
            width: 16,
            height: 'auto',
            'float': 'right',
            marginRight: 10
        }
        var greenDot = {
            height: 8,
            width: 8,
            marginTop: 5,
            'float': 'right',
            marginRight: 16,
            backgroundColor: '#4CAF50',
            fontSize: 3,
            padding: 1,
            color: '#4CAF50',
            borderRadius: '100%'
        }
        const { first_name, last_name, id, image_url, bio, showBio } = this.state
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
                { !this.state.showOnline && <div className="effect1" id="online-menu" onClick={ this.toggleShowOnline } >online<div style={ greenDot } id="green-dot">o</div></div> }
                <BrowserRouter>
                    <div>
                        <Route exact path='/' render={ () => (
                            <Profile
                                image_url={ image_url }
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
                        <Route exact path='/profile' render={ () => (
                            <Profile
                                image_url={ image_url }
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
                        <Route exact path='/friends' component={Friends} />
                        {/*<Route exact path='/online-now' component={OnlineNow} />*/}
                        {/*<Route exact path='/chat' component={Chat} />*/}
                    </div>
                </BrowserRouter>
                { this.state.showChat && <Chat toggleShowChat={ this.toggleShowChat } /> }
                { this.state.showOnline && <OnlineNow toggleShowChat={ this.toggleShowOnline } /> }
                {/*<div style={logout} className="contex-box">
                    <h3 id="log-out"><a href="/logout">Log out</a></h3>
                </div>*/}
                { !this.state.showChat && <div id="chat-menu" onClick={ this.toggleShowChat } ><i style={ chatImgStyle } className="far fa-comment"></i>chat</div> }
            </div>
        )
    }
}

export default App
