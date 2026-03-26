const express = require("express");
const router = express.Router();

const protect = require("../middlewares/auth.middleware");
const {
  createLog,
  getUserLogs,
  getLogById,
  deleteLog,
} = require("../controllers/log.controller");

// Protected routes
router.post("/", protect, createLog);
router.get("/", protect, getUserLogs);
router.get("/:id", protect, getLogById);
router.delete("/:id", protect, deleteLog);

module.exports = router;