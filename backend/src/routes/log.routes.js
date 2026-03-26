const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const { createLog, getLogs } = require("../controllers/log.controller");

// Protected routes
router.post("/", protect, createLog);
router.get("/", protect, getLogs);

module.exports = router;