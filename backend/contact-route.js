const express = require('express');
const router = express.Router();
const Message = require('./models/message');
const { getAdminSocketId } = require('./socket.js');
const { io } = require('./app.js'); 

function RandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

router.post('/send-message', (req, res) => {
    const data = req.body;

    Message.create({
        name: data.name,
        email: data.email,
        value: data.message,
        id: RandomString()
    })
    .then((message) => {
        const adminSocketId = getAdminSocketId();
        if (adminSocketId) {
            io.to(adminSocketId).emit('message-notification', message);
        }
        res.send(message);
    })
    .catch((err) => {
        console.error(err);
        res.json(err);
    })
    

    //user is sent email notifying that a message is sent along with message data,
    //in admin panel, there is a message which can be viewed
})

function RandomString() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
    }
    return result;
}

module.exports = router;