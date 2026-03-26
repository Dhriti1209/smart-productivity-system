const DailyLog = require("../models/dailyLog.model");

// Get user analytics
exports.getAnalytics = async (req, res) => {
  try {
    const logs = await DailyLog.findAll({
      where: { userId: req.user.id },
      order: [["date", "DESC"]],
    });

    if (!logs.length) {
      return res.status(200).json({
        totalLogs: 0,
        avgSleep: 0,
        avgStudy: 0,
        avgMood: 0,
        completionRate: 0,
        productivityScore: 0,
        burnoutRisk: "No data",
        recommendation: "Start logging your daily habits to get insights.",
      });
    }

    const totalLogs = logs.length;

    const totalSleep = logs.reduce((sum, log) => sum + log.sleepHours, 0);
    const totalStudy = logs.reduce((sum, log) => sum + log.studyHours, 0);
    const totalMood = logs.reduce((sum, log) => sum + log.mood, 0);
    const totalTasksPlanned = logs.reduce((sum, log) => sum + log.tasksPlanned, 0);
    const totalTasksCompleted = logs.reduce((sum, log) => sum + log.tasksCompleted, 0);
    const totalDistractions = logs.reduce((sum, log) => sum + log.distractions, 0);

    const avgSleep = +(totalSleep / totalLogs).toFixed(2);
    const avgStudy = +(totalStudy / totalLogs).toFixed(2);
    const avgMood = +(totalMood / totalLogs).toFixed(2);
    const avgDistractions = +(totalDistractions / totalLogs).toFixed(2);

    const completionRate =
      totalTasksPlanned > 0
        ? +((totalTasksCompleted / totalTasksPlanned) * 100).toFixed(2)
        : 0;

    // Simple productivity score formula
    const productivityScore = +(
      (avgSleep * 0.25 +
        avgStudy * 0.25 +
        (avgMood / 5) * 25 +
        (completionRate / 100) * 25)
    ).toFixed(2);

    // Burnout logic
    let burnoutRisk = "Low";
    if (avgSleep < 5.5 && avgStudy > 6 && avgMood < 3) {
      burnoutRisk = "High";
    } else if (avgSleep < 6.5 || avgMood < 3.5 || avgDistractions > 5) {
      burnoutRisk = "Moderate";
    }

    // Basic recommendation engine
    let recommendation = "You're doing well. Keep maintaining consistency.";

    if (avgSleep < 6) {
      recommendation = "Try improving your sleep. Better rest can improve productivity.";
    } else if (avgDistractions > 5) {
      recommendation = "Your distraction levels are high. Consider using focused work sessions.";
    } else if (completionRate < 60) {
      recommendation = "Your task completion rate is low. Try planning fewer but more realistic tasks.";
    } else if (avgMood < 3) {
      recommendation = "Your mood trend looks low. Consider balancing workload and taking breaks.";
    }

    res.status(200).json({
      totalLogs,
      avgSleep,
      avgStudy,
      avgMood,
      avgDistractions,
      completionRate,
      productivityScore,
      burnoutRisk,
      recommendation,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ message: "Server error while fetching analytics" });
  }
};