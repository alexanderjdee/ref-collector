const router = require("express").Router();
const refRoutes = require("./refs");
const userRoutes = require("./users");
const searchRoutes = require("../api/search");
const accountRoutes = require("./signin");

// API routes
router.use("/refs", refRoutes);
router.use("/users", userRoutes);
router.use("/search", searchRoutes);
router.use("/account", accountRoutes);

module.exports = router;
