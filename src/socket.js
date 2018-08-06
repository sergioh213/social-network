import * as io from 'socket.io-client';
import { onlineUsers, userJoined, userLeft } from './actions';

let socket;

export function init(store) {
    if (!socket) {
        socket = io.connect();

        socket.on('onlineUsers', users => {
            store.dispatch(onlineUsers(users))
        });

        socket.on('userJoined', user => {
            store.dispatch(userJoined(user))
        })

        socket.on('userLeft', userId => {
            store.dispatch(userLeft(userID))
        })

        socket.on('welcome', function(data) {
            console.log(data);
            socket.emit('thanks', {
                message: 'Thank you. It is great to be here.'
            });
        });
    }

}
