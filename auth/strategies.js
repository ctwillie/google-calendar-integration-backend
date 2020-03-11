const User = require('../models/User'),
      passport = require('passport'),
      PassportLocalStrategy = require('passport-local').Strategy,
      PassportJwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;



//passport-jwt
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromBodyField('foo');
opts.secretOrKey = 'secret';
opts.issuer = 'http://localhost:5000';
opts.audience = 'http://localhost';
const JwtStrategy = new PassportJwtStrategy(opts, function(jwt_payload, done) {

    console.log(opts);

    console.log('EXTRACTED DATA FROM AUTHENTICATION');
    console.log(jwt_payload);

    User.findOne({id: jwt_payload.sub}, function(err, user) {
        console.log('nope not working')
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
});

//passport-local
const LocalStrategy = new PassportLocalStrategy(
    (username, password, done) => {
        User.findOne({ username: username }, function (err, user) {
        if (err) { return done(err); }
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.hasValidPassword(password)) {
            return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
        });
    }
);

module.exports = {
    local: LocalStrategy,
    jwt: JwtStrategy
};