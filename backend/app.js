const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());

const PORT = 5500;

const admin = require('./admin-route');
app.use('/api/admin', admin);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});