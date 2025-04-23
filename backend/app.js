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
app.use(cors({
    origin: process.env.FRONTEND_URL,  
    credentials: true 
  }));

const server = http.createServer(app);
const io = socketio(server, {
    cors: { origin: `http://localhost:${PORTf}` }
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