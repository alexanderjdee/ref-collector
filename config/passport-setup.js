const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
//const keys = require("./keys");

passport.use(
  new GoogleStrategy({
    //options for the google strategy
    callbackURL: "/auth/google/redirect",
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret
  }, 
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  })
);