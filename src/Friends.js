import React, {Component} from 'react'
import axios from './axios'
import { connect } from 'react-redux';
import { receiveFriendsWannabes,acceptFriendRequest, endFriendship } from './actions';
import FriendButton from './FriendButton'

const mapStateToProps = state => {
    return {
        wannabes: state.wannabes,
        friends: state.friends
    }
}

class Friends extends Component {
    constructor(props) {
        super(props)

        this.state = {}

        this.handleAccept = this.handleAccept.bind(this)
        this.handleEndFriend = this.handleEndFriend.bind(this)
    }
    componentDidMount() {
        this.props.dispatch(receiveFriendsWannabes())
    }

    handleAccept(wannabeId) {
        console.log("id of the accepted user: ", wannabeId);
        this.props.dispatch(acceptFriendRequest(wannabeId))
    }

    handleEndFriend(friendId) {
        this.props.dispatch(endFriendship(friendId))
    }

    render() {
        var wannabeStyleSize = 300
        var wannabesBox = {
            margin: '0 auto',
            paddingTop: 10,
            paddingBottom: 10,
            position: 'relative',
            width: '90%',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gridGap: '30px',
            backgroundColor: 'rgba(0,0,0,0.5)',
            borderRadius: 20
        }
        var emptyListStyle = {
            position: 'relative',
            display: 'block',
            margin: '0 auto',
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'rgba(0,0,0,0.5)',
            width: '90%',
            paddingTop: 4,
            paddingBottom:  4,
            borderRadius: 20
        }
        var wannabeStyle = {
            position: 'relative',
            display: 'block',
            margin: '0 auto',
            textAlign: 'center',
            color: 'white'
        }
        var picStyle = {
            width: 185,
            objectFit: 'cover',
            objectPosition: 'center'
        }
        var headerStyling = {
            width: '70%',
            margin: "0 auto",
            backgroundColor: '#5D3440',
            marginBottom: 20,
            marginTop: 40,
            padding: 10,
            fontSize: 20,
            paddingLeft: 20,
            color: 'white',
            fontWeight: 'bold'
        }
        if ( !this.props.friends ) {
            return null;
        }
        console.log('this.props.friends: ', this.props.friends);
        return (
            <div id="friends">
                {/*<h1>FRIENDS PAGE!!</h1>*/}
                <div style={ headerStyling } id="header" className="effect1">These are all your friends:</div>
                { !this.props.friends.length
                    ? <div style={ emptyListStyle }>No people at this moment</div>
                    : <div style={ wannabesBox } id="wannabes-box" className="effect1">
                        { this.props.friends &&
                            this.props.friends.map(
                                friend => (
                                    <div style={ wannabeStyle } key={friend.id} id="wannabe" className="friend">
                                        <div>
                                            <img id="profile-pic" src={ friend.image_url } style={ picStyle } alt="User's profile picture" />
                                        </div>
                                        <div>
                                            { friend.first_name }
                                        </div>
                                        <div>
                                            { friend.last_name }
                                        </div>
                                        <FriendButton handleEndFriend={ this.handleEndFriend } id={ friend.id } />
                                    </div>
                                )
                            )
                        }
                    </div>
                }

                <div style={ headerStyling } id="header" className="effect1">These people want to be your friend:</div>
                { !this.props.wannabes.length
                    ? <div style={ emptyListStyle }>No people at this moment</div>
                    : !this.props.wannabes==[] && <div style={ wannabesBox } id="wannabes-box" className="effect1">
                        { this.props.wannabes &&
                            this.props.wannabes.map(
                                wannabe => (
                                    <div style={ wannabeStyle } key={ wannabe.id } id="wannabe" className="effect1">
                                        <div>
                                            <img id="profile-pic" src={ wannabe.image_url } style={ picStyle } alt="User's profile picture" />
                                        </div>
                                        <div>
                                            { wannabe.first_name }
                                        </div>
                                        <div>
                                            { wannabe.last_name }
                                        </div>
                                        <FriendButton handleAccept={ this.handleAccept} id={ wannabe.id } />
                                    </div>
                                )
                            )
                        }
                    </div>
                }
        </div>
        )
    }
}

export default connect(mapStateToProps)(Friends)
