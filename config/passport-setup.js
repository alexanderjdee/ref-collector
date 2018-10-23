const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;
const keys = require("./keys");

passport.use(
  new GoogleStrategy({
    //options for the google strategy
    clientID: keys.google.clientId,
    clientSecret: keys.google.clientSecret,
    callbackURL: "/auth/google/redirect"
  },
  (accessToken, refreshToken, profile, done) => {
    console.log('passport callback function fired');
    console.log(profile);
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   done(err, user);
    // });
  })
);