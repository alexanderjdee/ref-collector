const router = require("express").Router();
const refRoutes = require("./refs");
const userRoutes = require("./users");
const authRoutes = require("../api/auth-routes");
const searchRoutes = require("../api/search");

// API routes
router.use("/refs", refRoutes);
router.use("/users", userRoutes);
router.use("/search", searchRoutes);
router.use("/auth", authRoutes);

module.exports = router;
