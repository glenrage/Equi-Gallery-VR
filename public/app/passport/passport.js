'use strict';

const dotenv = require('dotenv');
let FaceBookStrategy = require('passport-facebook').Strategy; // Import passport-facebook package
let TwitterStrategy = require('passport-twitter').Strategy; //Import passport-twitter package
let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; //Import Passport Google package
let User = require('../server/model/user-model.js'); //Import user model
let session = require('express-session'); //import express session package
let jwt = require('jsonwebtoken'); //import jwt package
let secret = 'airbud'; //create custom secret to use with jwt

dotenv.load();

module.exports = function(app, passport) {
  //start passport configuration settings
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(session({ secret: 'homeward bound', resave: false, saveUnitialized: true, cookie: {secure: false } }));
  //end passport configuration settings

  //serialize users once logged in
  passport.serializeUser(function(user, done) {
    //check if the user has an active account
    if (user.error) {
      token = 'uncomfirmed/error'; // NOTE: set url to different error page
    } else {
      token = jwt.sign({ username: user.username, email: user.email }, secret, {expiresIn: '24h' }); //if account is active, give user token
    }
  } else {
    token = 'inactive/error'; //if account not active, provide invalid token for use in redirecrting later
  }
  done(null, user.id); //return user Object
  );

  //Deserialize users once logged out
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user); //complete deserializeUser and return done
    });
  });

  //Facebook Strategy
  passport.use(new FaceBookStrategy({
    clientId: process.env.FACEBOOK_CLIENT_ID, //replace with our facebook developer app client id
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET, //replace with our fb developer client Secret
    callbackURL: 'http://localhost:8080/auth/facebook/callback', //replace with our fb developer app callback url
    profileFields: ['id', 'displayName', 'photos', 'email']
  },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ email: profile._json.email }).select('username active password email').exec(function(err, user) {
        if (err) done(err);

        if (user && user !== null) {
          done(null, user);
        } else {
          done(err);
        }
      });
    }));

    //Twitter Strategy
    passport.use(new TwitterStrategy({
      consumerKey: process.env.TWITTER_KEY, //replace with twitter dev ap consumer KEY
      consumerSecret: process.env.TWITTER_SECRET, //replace with twitter dev app consumer SECRET
      callbackURL: 'http://localhost:3000/auth/twitter/callback', //replace with twitter deve app callback url
      userProfileURL: 'https://api.twitter.com/1.1/account/verify_credentials.json?include_email=true'
    },
    function(token, tokenSecret, profile, done) {
      if(profile.emails) {
        User.findOne({ email: profile.emails[0].value }).select('username active password email').exec(function(err, user) {
          if(err) {
            done(err);
          } else {
            if (user && user !== null) {
              done(null, user);
            } else {
              done(err);
            }
          }
        });
      } else {
        user = {}; //since no user object exists, create temporary one in order to return an error
        user.id = 'null'; //temp id
        user.active = true; //temp status
        user.error = true; //ensure error is known to exist
        done(null, user); //serialize and catch error
      }
    }
  ));

  //Google Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID, //replace with google developer app client id
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, //replace with google developer app client SECRET
    callbackURL: 'http://localhost:3000/auth/google/callback' //replace with google dev app callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOne({ email: profile.emails[0].value}).select('username active password email').exec(function(err, user) {
      if(err) done(err);

      if (user && user !== null) {
        done(null, user);
      } else {
        done(err);
      }
    });
  }));

  //Google routes
  app.get('/auth/google', passport.authenticate('google', { scope: ['https://www.googleapis.com/auth/plug.login', 'profile', 'email'] }));
  app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/googleerror' }), function(req, res) {
    res.redirect('/google/' + token); //redirect user with newly assigned token
  });

  //Twitter routes
  app.get('/auth/twitter', passport.authenticate('twitter'));
  app.get('/auth/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/twittererror' }), function(req, res) {
    res.redirect('/twitter/' + token); //redirect user with newly assigned token
  });

  //Facebook routes
  app.get('/auth/facebook', passport.authenticate('facebook', { scope: 'email' }));
  app.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/facebookerror' }), function(req, res) {
    res.redirect('/facebook/' + token); //redirect user with newly assigned token
  });

  return passport; //return passport object
};
