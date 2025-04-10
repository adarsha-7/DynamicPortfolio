const express = require('express');
const router = express.Router();

router.post('/send', (req, res) => {
    const data = req.body;
    res.json({"Received data": 
        {"name": data.name, 
        "email": data.email, 
        "message":data.message}});

        //message data is stored in database, 
        //user is sent notification through the website itself,
        //user is sent email notifying that a message is sent along with message data,
        //in admin panel, there is a message which can be viewed

})

module.exports = router;