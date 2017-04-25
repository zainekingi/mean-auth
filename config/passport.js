/* -------------------------------------------------
 * FILE: PASSPORT.JS
 * AUTHOR: Zaine Kingi
 * VER: 1.0
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