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
        this.props.dispatch(acceptFriendRequest(wannabeId))
    }

    handleEndFriend(friendId) {
        this.props.dispatch(endFriendship(friendId))
    }

    render() {
        if ( !this.props.friends ) {
            return null;
        }
        console.log('this.props.friends: ', this.props.friends);
        return (
            <div id="friends">
                <h1>FRIENDS PAGE!!</h1>
                <div>Friends</div>
                { this.props.friends &&
                    this.props.friends.map(
                        friend => (
                            <div key={friend.id} className="friend">
                                <div>
                                    { friend.first_name }
                                </div>
                                <FriendButton handleEndFriend={ this.handleEndFriend } id={ friend.id } />
                            </div>
                        )
                    )
                }
                <div>Wannabes</div>
                { this.props.wannabes &&
                    this.props.wannabes.map(
                        wannabe => (
                            <div key={wannabe.id} className="wannabe">
                                <div>
                                    { wannabe.first_name }
                                </div>
                                <FriendButton handleAccept={ this.handleAccept} id={ wannabe.id } />
                            </div>
                        )
                    )
                }
            </div>
        )
    }
}

export default connect(mapStateToProps)(Friends)
