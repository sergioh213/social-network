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
        console.log("this.state.message: ", this.state.message);
        newChatMessage(this.state.message)
    }

    handleChange(e) {
        this.setState({
            [ e.target.name ] : e.target.value
        })
    }

    formatDate(dateValue) {
        if (!dateValue) {
            var newDate = new Date()
            console.log("newDate: ", newDate);
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
            console.log("dateValue: ", dateValue, " indexOfMonth: ", indexOfMonth, " yearValue: ", yearValue, " dayValue: ", dayValue, " timeValue: ", timeValue);
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
            console.log("dateValue: ", dateValue, " indexOfMonth: ", indexOfMonth, " yearValue: ", yearValue, " dayValue: ", dayValue, " timeValue: ", timeValue);
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
        console.log("this.props.messages: ", this.props.messages);
        var imageSize = 50
        var chatDivSize = 500
        var dateBoxSize = 100
        var textAreaMarginTop = 12
        var textAreaHeight = 150
        var totalHeight = (imageSize * 10) + textAreaHeight + textAreaMarginTop
        var textBoxSize = chatDivSize - imageSize - dateBoxSize
        var chatDiv = {
            backgroundColor: 'red',
            border: 'blue 1px solid',
            width: chatDivSize,
            height: totalHeight
        }
        var wrapper = {
            backgroundColor: '#EDCBB1'
        }
        var textareaStyle = {
            resize: 'none',
            height: textAreaHeight,
            width: chatDivSize - imageSize - dateBoxSize,
            marginLeft: imageSize,
            marginTop: textAreaMarginTop
        }
        var gridBox = {
            display: 'grid',
            gridTemplateColumns: "" + imageSize + "px, " + textBoxSize + "px," + dateBoxSize + "px" //'repeat( 3, 1fr )'
        }
        var imageStyle = {
            backgroundColor: 'pink',
            gridColumn: 1,
            width: imageSize,
            height: imageSize
        }
        var profilePic = {
            width: imageSize,
            height: imageSize,
            objectFit: 'cover',
            objectPosition: 'center'
        }
        var messageStyle = {
            backgroundColor: 'pink',
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
            backgroundColor: 'pink',
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
            width: dateBoxSize - 2,
            margin: 0,
            // top: 0
        }
        return (
            <div style={ chatDiv } id="chat">
                    {/*<h1 id="title" style={titleStyle} >GLOBAL CHAT PAGE</h1>*/}
                    <div id="wrapper">
                        { this.props.messages &&
                            this.props.messages.map(
                                message => (
                                    <div id="gridBox" style={ gridBox } key={ message.id } className="message">
                                        <div style={ imageStyle }>
                                            <img style={ profilePic } src={ message.image_url } alt="Profile picture"/>
                                        </div>
                                        <div id="message-box" style={ messageStyle }>
                                            <div style={ nameStyle }>
                                                { `${message.first_name} ${message.last_name}` }
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
                <textarea onChange={ e => this.handleChange(e) } name="message" style={ textareaStyle } cols="30" rows="10"></textarea>
                <button style={ buttonStyle } onClick={ () => this.sendMessage() }>Send</button>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Chat)
