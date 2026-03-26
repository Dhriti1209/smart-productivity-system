const DailyLog = require("../models/dailyLog.model");

// Add Daily Log
exports.createLog = async (req, res) => {
  try {
    const {
      date,
      sleepHours,
      studyHours,
      mood,
      tasksPlanned,
      tasksCompleted,
      distractions,
      exercise,
    } = req.body;

    if (
      !date ||
      sleepHours === undefined ||
      studyHours === undefined ||
      mood === undefined ||
      tasksPlanned === undefined ||
      tasksCompleted === undefined ||
      distractions === undefined
    ) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const log = await DailyLog.create({
      userId: req.user.id,
      date,
      sleepHours,
      studyHours,
      mood,
      tasksPlanned,
      tasksCompleted,
      distractions,
      exercise,
    });

    return res.status(201).json({
      message: "Daily log created successfully",
      log,
    });
  } catch (error) {
    console.error("Create log error:", error);
    res.status(500).json({ message: "Server error while creating log" });
  }
};

// Get all logs for logged-in user
exports.getUserLogs = async (req, res) => {
  try {
    const logs = await DailyLog.findAll({
      where: { userId: req.user.id },
      order: [["date", "DESC"]],
    });

    res.status(200).json(logs);
  } catch (error) {
    console.error("Get logs error:", error);
    res.status(500).json({ message: "Server error while fetching logs" });
  }
};

// Get single log by ID
exports.getLogById = async (req, res) => {
  try {
    const log = await DailyLog.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    res.status(200).json(log);
  } catch (error) {
    console.error("Get log by ID error:", error);
    res.status(500).json({ message: "Server error while fetching log" });
  }
};

// Delete log
exports.deleteLog = async (req, res) => {
  try {
    const log = await DailyLog.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!log) {
      return res.status(404).json({ message: "Log not found" });
    }

    await log.destroy();

    res.status(200).json({ message: "Log deleted successfully" });
  } catch (error) {
    console.error("Delete log error:", error);
    res.status(500).json({ message: "Server error while deleting log" });
  }
};