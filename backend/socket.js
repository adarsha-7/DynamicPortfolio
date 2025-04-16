const { io } = require('./app.js');

let adminSocketId = null;

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    socket.on('admin-join', () => {
        adminSocketId = socket.id;
        console.log('Admin joined:', adminSocketId);
    });

    socket.on('disconnect', () => {
        console.log('Disconnected:', socket.id);
        if (socket.id === adminSocketId) adminSocketId = null;
    });
});

const getAdminSocketId = () => adminSocketId;
module.exports = { getAdminSocketId };
