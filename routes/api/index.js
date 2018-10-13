const router = require("express").Router();
const refRoutes = require("./refs");
const userRoutes = require("./users");
const authRoutes = require("../api/auth-routes");

// API routes
router.use("/refs", refRoutes);
router.use("/users", userRoutes);
router.use("/auth-routes/auth", authRoutes);

module.exports = router;
