const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cookieParser());
app.use(express.json()); 

const PORT = 5500;

const admin = require('./admin-route');
app.use('/api/admin', admin);

const contact = require('./contact-route');
app.use('/api/contact', contact);

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});