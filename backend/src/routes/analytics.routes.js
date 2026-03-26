const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const { getAnalytics } = require("../controllers/analytics.controller");

router.get("/", protect, getAnalytics);

module.exports = router;