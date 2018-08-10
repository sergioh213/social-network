import React, {Component} from 'react'
import axios from './axios'
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        users: state.users
    }
}

class OnlineNow extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
    }

    render() {
        console.log('this.props.users: ', this.props.users);
        var imageBoxSixe = 50
        var imageSize = imageBoxSixe - 20
        // var textAreaMarginTop = 12
        // var textAreaHeight = 150
        // var totalHeight = (imageSize * 10) + textAreaHeight + textAreaMarginTop
        var textBoxSize = imageSize
        var wholeThing = {
            // backgroundColor: '#f9dac2',
            border: '#5D3440 3px solid',
            borderRight: 'none',
            borderTop: 'none',
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            top: 48,
            right: 0
            // cursor: 'pointer'
        }
        var imageBox = {
            // backgroundColor: 'pink',
            gridColumn: 1,
            width: imageBoxSixe,
            // height: imageBoxSixe,
            textAlign: 'center',
            marginTop: imageBoxSixe/2 - imageSize/2 -2
        }
        var profilePic = {
            width: imageSize,
            height: imageSize,
            objectFit: 'cover',
            objectPosition: 'center',
            borderRadius: "100%"
        }
        var nameStyle = {
            width: 'auto',
            gridColumn:  2,
            gridRow:  1,
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: imageSize/2 - 4,
            marginLeft: 16 + 10
        }
        var gridBox = {
            display: 'grid',
            gridTemplateColumns: "" + imageBoxSixe + "px", //'repeat( 3, 1fr )'
        }
        var sectionHeader = {
            backgroundColor: 'red'
        }
        var menuStyle = {
            borderRadius: 0,
            position: 'relative',
            borderLeft: 'none'
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
        var linkStyle = {
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: 18,
            color: 'black'
        }
        return (
            <div style={ wholeThing } id="online-now" className="effect1">
            <div style={ menuStyle } id="online-menu" onClick={ this.props.toggleShowChat } >online<div style={ greenDot } id="green-dot">o</div></div>
                { this.props.users &&
                    this.props.users.map(
                        user => (
                            <div style={ gridBox } key={user.id} id="user-box">
                                <div style={ imageBox }>
                                    <a href={`/user/${user.id}`}><img style={ profilePic } src={ user.image_url } alt="Profile picture"/></a>
                                </div>
                                <div id="message-box" style={ nameStyle }>
                                    <a style={ linkStyle } href={`/user/${user.id}`}>{ `${user.first_name} ${user.last_name}` }</a>
                                </div>
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(OnlineNow)
