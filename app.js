// -------------------------------------------------
// FILE: APP.JS
// AUTHOR: Zaine Kingi
// VER: 1.0
// DESC: Main server entry point file.
// -------------------------------------------------

// application dependencies.
const express = require('express');
const path = require('path');
const bodyPaser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// connect to database.
mongoose.connect(config.database);

// on connection.
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database);
});

// on error.
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});

// initialise the app variable with express.
const app = express();

// include the user routes file.
const users = require('./routes/users');

// ====================================
// START: Application Middleware.
// ------------------------------------
// CORS.
app.use(cors());

// Set static folder.
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser.
app.use(bodyPaser.json());

// Passport Middleware
app.use(passport.initialize()); // Passport initialize.
app.use(passport.session()); // Passport session.

require('./config/passport')(passport);

// Users.
app.use('/users', users);

// ------------------------------------
// END: Application Middleware.
// ------------------------------------

// ====================================
// START: Application Routes.
// ------------------------------------
// Index route.
app.get('/', (req, res) => {
    res.send('Invalid endpoint');
});
// ------------------------------------
// END: Application Routes.
// ------------------------------------

// create the port variable.
const port = process.env.PORT || 8080; // Heroku port setting.

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'));
});

// configure the app port.
app.listen(port, () => { console.log('Server running on PORT ' + port );});
