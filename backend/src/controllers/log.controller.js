const DailyLog = require("../models/dailyLog.model");

// @desc Create a daily log
// @route POST /api/logs
// @access Private
const createLog = async (req, res) => {
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
      focusLevel,
      energyLevel,
      stressLevel,
      notes,
    } = req.body;

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
      focusLevel,
      energyLevel,
      stressLevel,
      notes,
    });

    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({
      message: "Failed to create log",
      error: error.message,
    });
  }
};

// @desc Get all logs for logged-in user
// @route GET /api/logs
// @access Private
const getLogs = async (req, res) => {
  try {
    const logs = await DailyLog.findAll({
      where: { userId: req.user.id },
      order: [["date", "DESC"]],
    });

    res.json(logs);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch logs",
      error: error.message,
    });
  }
};

module.exports = {
  createLog,
  getLogs,
};