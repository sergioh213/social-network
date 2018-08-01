import React, {Component} from 'react'
import axios from './axios'

class Uploader extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.imageSelected = this.imageSelected.bind(this)
        this.upload = this.upload.bind(this)
    }
    imageSelected(e) {
        this.setState({
            imageFile : e.target.files[0],
            imageName : e.target.files[0].name
        })
    }
    upload() {
        var self = this
        var formData = new FormData;
        if (this.state.imageFile == '') {
            this.setState({
                error: 'Please select a file in order to upload'
            })
        } else {
            formData.append('file', this.state.imageFile);
            axios.post('/upload', formData)
                .then((res) => {
                    if (res.data.success) {
                        this.props.setImage(res.data.url)
                    }
                })
        }
    }
    render() {
        return (
            <div id="uploader">
                <p id="close-x" onClick={ this.props.hideUploader }>x</p>
                <h3 id="profile-header">Change your profile image</h3>
                <label id="file-label" htmlFor="file-field">Select image</label>
                <input id="file-field" type="file" onChange={ this.imageSelected } name="" value=""></input>
                { this.state.imageName && <div id="imageName">{ this.state.imageName }</div> }
                <button id="upload-button" onClick={ this.upload } name="button">Upload</button>
            </div>
        )
    }
}

export default Uploader
