// -------------------------------------------------
// FILE: USERS.JS
// AUTHOR: Zaine Kingi
// VER: 1.0
// DESC: Main user routes file.
// -------------------------------------------------

// file dependencies.
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/users');

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
router.post('/authenticate', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    // check if the username is returned from the database.
    User.getUserByUsername(username, (err, user) => {
        // check for error.
        if(err) throw err;

        // check if username exists.
        if(!user) {
            return res.json({
                success: false,
                message: 'User not found'
            });
        }

        // user was returned.
        User.comparePassword(password, user.password, (err, isMatch) => {
            // check for error.
            if(err) throw err;

            // check password with stored password.
            if(isMatch) {
                // create the token.
                const token = jwt.sign(user, config.secret, {
                    expiresIn: 604800 // week in secs
                });

                // send the response to the frontend.
                res.json({
                    success: true,
                    token: 'JWT ' +token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({success: false, message: 'Wrong password'});
            }
        });
    });
});

// profile.
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({user: req.user});
});

// =================================================
// END: User routes.
// -------------------------------------------------

// export the users file.
module.exports = router;