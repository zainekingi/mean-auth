// -------------------------------------------------
// FILE: USERS.JS
// AUTHOR: Zaine Kingi
// VER: 1.0
// DESC: Main user model file.
// -------------------------------------------------

// file dependencies.
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

/* =================================================
* START: user schema
* ----------------------------------------------- */
const UserSchema = mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// export the user model.
const User = module.exports = mongoose.model('User', UserSchema);

/* ==================================================
*  START: user model functions.
* ------------------------------------------------- */

// FUNCTION: Get user by ID.
module.exports.getUserById = (id, callback) => {
    User.findById(id, callback);
};

// FUNCTION: Get user by username.
module.exports.getUserByUsername = (username, callback) => {
    const query = {username: username};
    User.findOne(query, callback);
};

// FUNCTION: Compare user input password with database.
module.exports.comparePassword = (candidatePassword, hash, callback) => {
    // use bcrypt compare method to compare the password with the saved hash.
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
        // check for error.
        if(err) throw err;
        callback(null, isMatch);
    });
};

// FUNCTION: Add new user.
module.exports.addUser = (newUser, callback) => {
    // Hash the password.
    bcrypt.genSalt(10, (err, salt) => {
        // call the bcrypt hash method passing the newUser object, salt and callback with err and hash as arguments.
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            // check for errors.
            if (err) throw err;
            // assign the value of hash as the password.
            newUser.password = hash;
            // save the newUser.
            newUser.save(callback);
        });
    });
};