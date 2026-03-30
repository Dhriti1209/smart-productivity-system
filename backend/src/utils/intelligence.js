function calculateProductivityScore({
  sleepHours,
  studyHours,
  mood,
  focusLevel,
  energyLevel,
  stressLevel,
  tasksPlanned,
  tasksCompleted,
  distractions,
  exercise,
}) {
  let score = 0;

  // Sleep contribution
  if (sleepHours >= 7 && sleepHours <= 8) score += 20;
  else if (sleepHours >= 6) score += 15;
  else if (sleepHours >= 5) score += 10;
  else score += 5;

  // Study contribution
  if (studyHours >= 4 && studyHours <= 8) score += 20;
  else if (studyHours > 8) score += 15;
  else if (studyHours >= 2) score += 10;
  else score += 5;

  // Task completion ratio
  if (tasksPlanned > 0) {
    const completionRate = tasksCompleted / tasksPlanned;
    if (completionRate >= 0.8) score += 15;
    else if (completionRate >= 0.5) score += 10;
    else score += 5;
  }

  // Ratings contribution
  score += (focusLevel || 0) * 1.5;
  score += (energyLevel || 0) * 1.5;
  score += (mood || 0) * 1;

  // Exercise bonus
  if (exercise) score += 5;

  // Distraction penalty
  if (distractions >= 8) score -= 10;
  else if (distractions >= 5) score -= 5;
  else if (distractions >= 2) score -= 2;

  // Stress penalty
  score -= (stressLevel || 0) * 1.2;

  score = Math.max(0, Math.min(100, Math.round(score)));
  return score;
}

function calculateBurnoutRisk({
  sleepHours,
  studyHours,
  mood,
  focusLevel,
  energyLevel,
  stressLevel,
  distractions,
  exercise,
}) {
  let risk = 0;

  if (sleepHours < 5) risk += 25;
  else if (sleepHours < 6) risk += 15;
  else if (sleepHours < 7) risk += 8;

  if (studyHours > 8) risk += 20;
  else if (studyHours > 6) risk += 10;

  if ((stressLevel || 0) >= 8) risk += 25;
  else if ((stressLevel || 0) >= 6) risk += 15;

  if ((mood || 0) <= 4) risk += 10;
  if ((energyLevel || 0) <= 4) risk += 10;
  if ((focusLevel || 0) <= 4) risk += 10;

  if (distractions >= 8) risk += 10;
  else if (distractions >= 5) risk += 5;

  if (exercise) risk -= 5;

  risk = Math.max(0, Math.min(100, Math.round(risk)));
  return risk;
}

function generateRecommendation({
  sleepHours,
  studyHours,
  mood,
  focusLevel,
  energyLevel,
  stressLevel,
  tasksPlanned,
  tasksCompleted,
  distractions,
  exercise,
}) {
  if (sleepHours < 6) {
    return "Your sleep is too low. Prioritize rest to improve focus and productivity.";
  }

  if ((stressLevel || 0) >= 8) {
    return "Your stress is very high. Consider lighter study sessions and short recovery breaks.";
  }

  if ((focusLevel || 0) <= 4 && (energyLevel || 0) <= 4) {
    return "Low focus and energy detected. Try shorter deep-work sessions with breaks.";
  }

  if (studyHours > 8 && mood < 5) {
    return "You may be overworking. Reducing workload slightly could improve consistency.";
  }

  if (tasksPlanned > 0 && tasksCompleted / tasksPlanned < 0.5) {
    return "You’re completing fewer tasks than planned. Try setting smaller, more realistic daily goals.";
  }

  if (distractions >= 6) {
    return "High distraction levels detected. Consider using focused study blocks like Pomodoro.";
  }

  if (!exercise) {
    return "A little physical activity could improve your energy and concentration.";
  }

  return "You're doing well. Maintain your current routine and stay consistent.";
}

module.exports = {
  calculateProductivityScore,
  calculateBurnoutRisk,
  generateRecommendation,
};