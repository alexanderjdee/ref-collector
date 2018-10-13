const router = require("express").Router();
const passport = require("passport");

//auth logout
router.get("/logout", (req, res) => {
  //handle with passport
  res.send(console.log("logging out"));
});

router.get("/google", passport.authenticate("google", {
  scope: ["profile"]
}));

module.exports = router;