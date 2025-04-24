const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const PORTb = 5500;
const PORTf = 5000;

const app = express();

app.use(cookieParser());
app.use(express.json());

let url;
if (process.env.ENV == 'production')
    url = process.env.FRONTEND_URL
else
    url = process.env.FRONTEND_URL_DEV 

app.use(cors({
    origin: url,
    credentials: true
}));  

const server = http.createServer(app);
const io = socketio(server, {
    cors: { origin: url }
});

module.exports = { io };

const content = require('./routes/content-route');
app.use('/api/content', content);

const admin = require('./routes/admin-route');
app.use('/api/admin', admin);

const contact = require('./routes/contact-route');
app.use('/api/contact', contact);

const edit = require('./routes/edit-route');
app.use('/api/edit', edit);

const connectDB = require('./db/connect');

const run = () => {
    connectDB(process.env.MONGO_URI)
        .then(() => {
            server.listen(PORTb, () => {
                console.log(`Server listening on port ${PORTb}`);
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

run();