// -------------------------------------------------
// FILE: USERS.JS
// AUTHOR: Zaine Kingi
// VER: 1.0
// DESC: Main user routes file.
// -------------------------------------------------

// file dependencies.
const express = require('express');
const router = express.Router();
const User = require('../models/users');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// =================================================
// START: User routes.
// -------------------------------------------------
// register.
router.post('/register', (req, res, next) => {
    // create a new user.
    let newUser = new User({
        // get the new user info from the register form post.
        name: req.body.name,
        email: req.body.email,
        username: req.body.username,
        password: req.body.password
    });
    // run addUser function passing in the newUser object.
    User.addUser(newUser, (err, user) => {
        // check for errors.
        if(err) {
            res.json({
                success: false,
                message: "Failed to add user!"
            });
        } else {
            res.json({
                success: true,
                message: "User successfully added!"
            });
        }
    });
});

// authenticate.
router.post('/auth', (req, res, next) => {
    res.send('Users Auth');
});

// profile.
router.get('/profile', (req, res, next) => {
    res.send('User Profile');
});

// =================================================
// END: User routes.
// -------------------------------------------------

// export the users file.
module.exports = router;