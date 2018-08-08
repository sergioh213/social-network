import axios from './axios'

export function userJoined(user) {
    return {
        type: 'USER_JOINED',
        user
    }
}

export function onlineUsers(users) {
    return {
        type: 'ONLINE_USERS',
        users
    }
}

export function userLeft(id) {
    return {
        type: 'USER_LEFT',
        id
    }
}

export function receiveFriendsWannabes() {
    return axios.get("/friendsWannabes.json").then(({ data }) => {
        console.log("friendsWannabes axios get in actions: ", data);
        return {
            type: 'RECEIVE_LIST',
            friendsWannabes: data.friendsWannabes
        }
    })
}

export function acceptFriendRequest(wannabeId) {
    return axios.get("/user/" + wannabeId + ".json").then(({ data }) => {
        return {
            type: 'ACCEPT_FRIEND',
            data
        }
    })
}

export function endFriendship(friendId) {
    console.log("friendId in actions: ", friendId);
    return {
        type: 'END_FRIEND',
        friendId
    }
}

export function receiveMessages(messages) {
    console.log("IN ACTIONS: ", messages);
    return {
        type: 'RECEIVE_MESSAGES',
        messages
    }
}

export function newMessage(message) {
    console.log("message in actions.js: ", message);
    return {
        type: 'NEW_MESSAGE',
        message
    }
}
