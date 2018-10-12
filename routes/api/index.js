const router = require("express").Router();
const refRoutes = require("./refs");
const userRoutes = require("./users");

// Ref routes
router.use("/refs", refRoutes);
router.use("/users", userRoutes);

module.exports = router;
