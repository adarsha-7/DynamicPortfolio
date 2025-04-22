const express = require('express');
const router = express.Router();
const Message = require('../models/message');
const { getAdminSocketId } = require('./socket.js');
const { io } = require('../app.js'); 
const sgMail = require('@sendgrid/mail');

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

    //add message to database
    Message.create({
        name: data.name,
        email: data.email,
        value: data.message,
        id: RandomString()
    })
    .then((message) => { 
        //if admin is active i.e. opened the portfolio, send notification
        const adminSocketId = getAdminSocketId();
        if (adminSocketId) {
            io.to(adminSocketId).emit('message-notification', message);
            Message.findOneAndUpdate(
                { id: message.id },
                { notified: true }
            ).catch((err) => console.error('Update failed:', err));
        }

        //send email to the admin
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        const msg = {
            to: ['adarshghimire7@gmail.com', 'adarshghimire2005@gmail.com'],
            from: {
                email: 'mail@adarshaghimire.com.np',
                name: 'Portfolio'
            },
            subject: 'New Message in Portfolio',
            text: `from: ${data.name} <${data.email}> \n${data.message}`
        }
        sgMail.send(msg)
        .then(() => console.log('Email sent'))
        .catch((err) => console.error(err));
        res.send(message);
    })
    .catch((err) => {
        console.error(err);
        res.json(err);
    });
});

module.exports = router;