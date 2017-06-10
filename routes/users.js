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
const config = require('../config/database');

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
  // Get submitted data to validate.
  const username = req.body.username;
  const password = req.body.password;

  // See if a username exists.
  User.getUserByUsername(username, (err, user) => {
    // Check for errors.
    if(err) throw err;

    // Check if username exists.
    if(!user) {
      return res.json({
        success: false,
        message: 'Ooh! User not found!'
      });
    }

    // User record returned - compare passwords.
    User.comparePassword(password, user.password, (err, isMatch) => {

      // Check for errors.
      if(err) throw err;

      // Check password with stored password.
      if(isMatch) {

        // Create the token.
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // Set the expiry time - 1 week in secs.
        });

        // Send responds to the frontend.
        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.username,
            email: user.email
          }

        });
      } else {
        // Wrong password.
        res.json({
          success: false,
          message: 'Wrong password'
        });
      }
    });
  });
});

// profile.
router.get('/profile', passport.authenticate('jwt', {session: false}), (req, res, next) => {
  // Send the user data.
  res.json({user: req.user});
});

// =================================================
// END: User routes.
// -------------------------------------------------

// export the users file.
module.exports = router;
