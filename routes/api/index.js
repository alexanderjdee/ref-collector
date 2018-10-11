const router = require("express").Router();
const refRoutes = require("./refs");

// Ref routes
router.use("/refs", refRoutes);

module.exports = router;
