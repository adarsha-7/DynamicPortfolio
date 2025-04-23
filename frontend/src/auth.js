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
                //send notification
                if(Notification.permission == 'granted') {
                    new Notification("New Message Received", {
                        body: `From: ${message.name}\n${message.value.slice(0, 100)}`,
                        icon: '/icons/favicon.png'
                    })
                }
                //update message badge
                const badge = document.getElementById("message-badge");
                axios.get('/api/edit/messages')
                .then(res => {
                    let unseenCount = 0;
                    const messages = res.data;
                    messages.forEach((message) => {
                        if(!(message.seen)) unseenCount++;
                    })
                    if (unseenCount > 0) {
                        badge.textContent = unseenCount;
                        badge.classList.remove("hidden");
                        badge.classList.add("flex");
                    } 
                    else {
                        badge.classList.remove("flex");
                        badge.classList.add("hidden");
                    }
                })
            })
        }
    })
    .catch(err => console.log(err))
}

refreshToken();
setInterval(refreshToken, 290 * 1000)