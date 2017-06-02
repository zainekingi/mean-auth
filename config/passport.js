/* -------------------------------------------------
 * FILE: PASSPORT.JS
 * AUTHOR: Zaine Kingi
 * VER: 1.0
<<<<<<< HEAD
 * DESC: Passport strategy application file.
 * -------------------------------------------------- */

// File dependencies.
const JWTStrategy = require('passport-jwt').Strategy; // Strategy.
const ExtractJWT = require('passport-jwt').ExtractJwt; // ExtractJWT.
const User = require('../models/users'); // User model.
const config = require('./database'); // Database config file.

// Export the strategy function.
module.exports = (passport) => {
  // Create options.
  let opts = {};
  opts.jwtFromRequest = ExtractJWT.fromAuthHeader(); // Get the auth token from the header.
  opts.secretOrKey = config.secret; // Set the key.
  passport.use(new JWTStrategy(opts, (jwt_payload, done) => {

    //console.log(jwt_payload);

    User.getUserById(jwt_payload._doc._id, (err, user) => {
      // Check for error.
      if(err) return done(err, false);

      // Check for user.
      if(user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}
=======
 * DESC: Main configuration file for the application
 *       passport-jwt strategy.
 * -------------------------------------------------- */

 // file dependencies.
 const JwtStrategy = require('passport-jwt').Strategy;
 const ExtractJwt = require('passport-jwt').ExtractJwt;
 const User = require('../models/users');
 const config = require('../config/database');

 // export the strategy function.
 module.exports = (passport) => {
     let opts = {};
     opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
     opts.secretOrKey = config.secret;
     passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
         User.getUserById(jwt_payload._doc._id, (err, user) => {
             if(err) {
                 return done(err, false);
             }
             if(user) {
                 return done(null, user);
             } else {
                 return done(null, false);
             }
         });
    }));
}
>>>>>>> 143b5d7f72932e680f12512bab10e958279f9b7e
