const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const logRoutes = require("./routes/log.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/analytics", analyticsRoutes);

// Test Route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running successfully 🚀" });
});

module.exports = app;