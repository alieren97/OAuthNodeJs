const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model')

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL: '/auth/google/redirect'
    }, (accessToken,refreshToken,profile,done) => {
        // passport callback function
        User.findOne({googleId:profile.id}).then((currentUser)=>{
            if (currentUser) {
                console.log('User is : ' + currentUser)
            }
            else{
                const user = new User({
                    username:profile.displayName,
                    googleId: profile.id
                })
                user.save().then((newUser)=>{console.log('new user created: ' + newUser)})
            }
        })
      
    })
);