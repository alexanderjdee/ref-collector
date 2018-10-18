const router = require("express").Router();
const passport = require("passport");

//auth logout
router.get("/logout", (req, res) => {
  //handle with passport
  res.send(console.log("logging out"));
});

router.get("/google", passport.authenticate("google", {scope: ["profile"]}));

router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
});

module.exports = router;