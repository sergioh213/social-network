import React, {Component} from 'react'
import Logo from './Logo'
import axios from './axios'
import ProfilePic from './ProfilePic'
import Uploader from './Uploader'
import Nav from './Nav'

class App extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.showUploader = this.showUploader.bind(this)
        this.setImage = this.setImage.bind(this)
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
    componentDidMount() {
        axios.get("/user").then(
            ({data}) => {
                console.log("LOGGING DATA: ", data);
                this.setState(data)
            }
        )
    }
    render() {
        if (!this.state.id) {
            return (<img src="progressBar.gif" />)
        }
        return (
            <div id="app">
                <Nav />
                <ProfilePic
                    image={this.state.image}
                    first_name={this.state.first_name}
                    last_name={this.state.last_name}
                    clickHandler={this.showUploader}
                />
                <Logo />
                { this.state.uploaderIsVisible && <Uploader setImage={this.setImage} /> }
            </div>
        )
    }
}

export default App
