const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

const authenticateToken = function(req, res, next) {
    const accessToken = req.cookies.accessToken;
    if(!accessToken) return res.json({Authenticated: false, msg: "Access denied"});

    jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            console.log(err);
            return res.json({Authenticated: false, msg: "Access denied"});
        }
        next();
    });
}

router.get('/', authenticateToken, (req, res) => {
    res.json({Authenticated: true, msg: "Access given"});
});

router.get('/login', (req, res) => {
    if (req.query.email != process.env.ADMIN_EMAIL) 
        return res.json({msg: "Incorrect admin email"});
    if (req.query.password != process.env.ADMIN_PASSWORD)
        return res.json({msg: "Incorrect admin password"});

    const userPayload = { email: req.query.email };

    const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '300s'});
    const refreshToken = jwt.sign(userPayload, process.env.REFRESH_TOKEN_SECRET);

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 300 * 1000 
    });

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    return res.json({msg: "Login Success"});
});

router.post('/refresh', (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (refreshToken == null) return;

    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if(err) return res.json(err);
        const userPayload = { email: user.email };
        const accessToken = jwt.sign(userPayload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '300s'});
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 300 * 1000
        });
        res.send("Access token refreshed successfully");
    });
});

module.exports = router;