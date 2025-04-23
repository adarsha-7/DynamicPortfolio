import axios from 'axios';
axios.defaults.withCredentials = true;
import { io } from 'socket.io-client';

const baseURL = import.meta.env.VITE_ENV === 'production' ? import.meta.env.VITE_URL : '';

const PORTb = 5500;

function refreshToken() {
    axios.post(`${baseURL}/api/admin/refresh`)
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
                axios.get(`${baseURL}/api/edit/messages`)
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