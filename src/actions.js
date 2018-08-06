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

export function userLeft(user) {
    return {
        type: 'USER_LEFT',
        user
    }
}
