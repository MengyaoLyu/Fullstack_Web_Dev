const passport = require('passport');
const GoogleStategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');


const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
        done(null, user);
    });
});

//client id:
//client secret:
passport.use(
    new GoogleStategy({
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({googleId: profile.id}).then((existingUser) => {
                if (existingUser) {
                    // we already have a record with this user id
                    done(null, existingUser);
                } else {
                    // we don't have this user record
                    new User({googleId: profile.id})
                    .save()
                    .then(user => done(null, user));
                }
            });
        }
    )
);

