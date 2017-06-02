/* -------------------------------------------------
 * FILE: PASSPORT.JS
 * AUTHOR: Zaine Kingi
 * VER: 1.0
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
