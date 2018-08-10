import React, {Component} from 'react'
import axios from './axios'
import { connect } from 'react-redux';
import { newChatMessage } from './socket'
import { receiveFriendsWannabes, acceptFriendRequest, endFriendship } from './actions';

const mapStateToProps = state => {
    console.log("state.messages: ", state.messages);
    return {
        messages: state.messages
    }
}

class Chat extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.sendMessage = this.sendMessage.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.formatDate = this.formatDate.bind(this)
    }
    componentDidMount() {
    }
    sendMessage() {
        newChatMessage(this.state.message)
        this.setState({
            message: null
        })
    }
    handleChange(e) {
        this.setState({
            [ e.target.name ] : e.target.value
        })
    }
    formatDate(dateValue) {
        if (!dateValue) {
            var newDate = new Date()
            // console.log("newDate: ", newDate);
            var date = new Date('' + newDate)
            var indexOfMonth = date.getMonth()
            var yearValue = date.getFullYear() // dateValue.slice(0, 4)
            var dayValue = date.getDate() // dateValue.slice(0, 4)
            var timeValue // dateValue.slice(0, 4)
            if (date.getHours() < 12) {
                if (date.getMinutes() <= 9 ) {
                    timeValue = date.getHours() + ":0" + date.getMinutes() + "am"
                } else {
                    timeValue = date.getHours() + ":" + date.getMinutes() + "am"
                }
            } else {
                if (date.getMinutes() <= 9 ) {
                    timeValue = date.getHours() + ":0" + date.getMinutes() + "pm"
                } else {
                    timeValue = date.getHours() + ":" + date.getMinutes() + "pm"
                }
            }
            // console.log("dateValue: ", dateValue, " indexOfMonth: ", indexOfMonth, " yearValue: ", yearValue, " dayValue: ", dayValue, " timeValue: ", timeValue);
            var listOfMonths = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ]

            return {
                year: yearValue,
                month: listOfMonths[indexOfMonth],
                day: dayValue,
                time: timeValue
            }
            return {
                year: null,
                month: null,
                day: null,
                time: null
            }

        } else {
            var date = new Date('' + dateValue)
            var indexOfMonth = date.getMonth()
            var yearValue = date.getFullYear() // dateValue.slice(0, 4)
            var dayValue = date.getDate() // dateValue.slice(0, 4)
            var timeValue // dateValue.slice(0, 4)
            if (date.getHours() < 12) {
                if (date.getMinutes() <= 9 ) {
                    timeValue = date.getHours() + ":0" + date.getMinutes() + "am"
                } else {
                    timeValue = date.getHours() + ":" + date.getMinutes() + "am"
                }
            } else {
                if (date.getMinutes() <= 9 ) {
                    timeValue = date.getHours() + ":0" + date.getMinutes() + "pm"
                } else {
                    timeValue = date.getHours() + ":" + date.getMinutes() + "pm"
                }
            }
            // console.log("dateValue: ", dateValue, " indexOfMonth: ", indexOfMonth, " yearValue: ", yearValue, " dayValue: ", dayValue, " timeValue: ", timeValue);
            var listOfMonths = [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec'
            ]

            return {
                year: yearValue,
                month: listOfMonths[indexOfMonth],
                day: dayValue,
                time: timeValue
            }
        }
    }
    render() {
        var imageBoxSixe = 50
        var imageSize = imageBoxSixe - 20
        var chatDivSize = 500
        var dateBoxSize = 70
        var textAreaMarginTop = 12
        var textAreaHeight = 150
        var totalHeight = (imageSize * 10) + textAreaHeight + textAreaMarginTop
        var textBoxSize = chatDivSize - imageSize - dateBoxSize
        var chatDiv = {
            backgroundColor: '#f9dac2',
            border: '#5D3440 3px solid',
            borderBottom: 'none',
            borderRight: 'none',
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            bottom: 0,
            right: 0
        }
        var wrapper = {
            backgroundColor: '#EDCBB1'
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
        var messageStyle = {
            // backgroundColor: 'pink',
            width: textBoxSize,
            gridColumn:  2,
            display: 'grid',
            gridTemplateRows: 'repeat( 2 , 1fr )',
        }
        var nameStyle = {
            gridRow:  1,
            fontWeight: 'bold',
            fontSize: 18,
            marginTop: 2,
            marginLeft: 16 + 10
        }
        var textStyle = {
            gridRow:  2,
            margin: 0,
            marginLeft: 16,
            padding: 0
        }
        var dateBox = {
            width: dateBoxSize, // remove to 'auto' date width (making whole box bigger)
            gridColumn:  3,
            fontSize: 10,
            paddingTop: 2
        }
        var timeStyle = {
            fontSize: 14
        }
        var dateStyle = {
            marginLeft: 6
        }
        var titleStyle = {
            left: '50%',
            transform: 'translateX(-50%)',
            top: '100px',
            position: 'absolute',
            color: '#5D3440',
            fontWeight: 'bold'
        }
        var buttonStyle = {
            height: 20,
            margin: 0,
            fontSize: 14,
            padding: 0,
            width: chatDivSize - imageBoxSixe - dateBoxSize,
            marginLeft: imageBoxSixe + 16,
            display: 'block'
        }
        var inputSection = {
            backgroundColor: '#EDCBB1',
            paddingBottom: 4
        }
        var gridBox = {
            display: 'grid',
            gridTemplateColumns: "" + imageSize + "px, " + textBoxSize + "px," + dateBoxSize + "px", //'repeat( 3, 1fr )'
        }
        var topBar = {
            width: 'auto',
        }
        var closingX = {
            marginTop: 4
        }
        var chatImgStyle = {
            width: 16,
            height: 'auto',
            marginTop: 5,
            // 'float': 'right',
            marginLeft: imageBoxSixe/2 - 16/2 + 1,
            color: '#5D3440'
        }
        var linkStyle = {
            textDecoration: 'none',
            fontWeight: 'bold',
            fontSize: 18,
            color: 'black'
        }
        return (
            <div style={ chatDiv } id="chat" className="effect1">
                <div style={ topBar } id="top-chat-bar">
                    <i style={ chatImgStyle } className="far fa-comment"></i>
                    <div onClick={ this.props.toggleShowChat } style={ closingX } id="close-x">x</div>
                </div>
                <div id="wrapper">
                    { this.props.messages &&
                        this.props.messages.map(
                            message => (
                                <div id="gridBox" style={ gridBox } key={ message.id } >
                                    <div style={ imageBox }>
                                        <a href={`/user/${message.sender_id}`}><img style={ profilePic } src={ message.image_url } alt="Profile picture"/></a>
                                    </div>
                                    <div id="message-box" style={ messageStyle }>
                                        <div style={ nameStyle }>
                                            <a style={linkStyle} href={`/user/${message.sender_id}`}>{ `${message.first_name} ${message.last_name}` }</a>
                                        </div>
                                        <div style={ textStyle }>
                                            { message.message }
                                        </div>
                                    </div>
                                    <div style={ dateBox }>
                                        <div style={ timeStyle }>
                                            {`
                                                ${ this.formatDate(message.created_at).time }
                                                `}
                                        </div>
                                        <div style={ dateStyle }>
                                            {`
                                                ${ this.formatDate(message.created_at).day }
                                                 of
                                                ${ this.formatDate(message.created_at).month }
                                            `}
                                            <br />
                                            {`
                                                ${ this.formatDate(message.created_at).year }
                                             `}
                                         </div>
                                    </div>
                                </div>
                            )
                        )
                    }
                </div>
                <div style={ inputSection } id="input-section">
                    <textarea id="messages-textarea" onChange={ e => this.handleChange(e) } name="message" defaultValue={ this.state.message } cols="30" rows="10"></textarea>
                    <button style={ buttonStyle } onClick={ () => this.sendMessage() }>Send</button>
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Chat)
