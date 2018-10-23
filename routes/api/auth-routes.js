const router = require("express").Router();
const passport = require("passport");

//Google logout
router.get('/logout', (req, res) => {
  //handle with passport
  res.send(console.log("logging out"));
});

//auth with google
router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));

//callback for google redirect
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('/');
});

// //callback for google redirect
// router.get('/google/callback', 
//   passport.authenticate('google', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
// });

module.exports = router;