import axios from 'axios';
import { io } from 'socket.io-client';

const PORTb = 5500;

function refreshToken() {
    axios.post('/api/admin/refresh')
    .then(res => console.log(res.data))
    .then(res => {
        if(res !== null) {
            const socket = io(`http://localhost:${PORTb}`);
            socket.emit('admin-join');

            socket.on('message-notification', (message) => {
                if(Notification.permission == 'granted') {
                    new Notification("New Message Received", {
                        body: `From: ${message.name}\n${message.value.slice(0, 100)}`,
                        icon: '/icons/folder-blue.png'
                    })
                }
            })
        }
    })
    .catch(err => console.log(err))
}

refreshToken();
setInterval(refreshToken, 290 * 1000)