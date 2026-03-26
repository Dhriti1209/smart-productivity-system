const sequelize = require("../config/db");

const User = require("./user.model");
const DailyLog = require("./dailyLog.model");
const Prediction = require("./prediction.model");

// Relationships
User.hasMany(DailyLog, { foreignKey: "userId", onDelete: "CASCADE" });
DailyLog.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Prediction, { foreignKey: "userId", onDelete: "CASCADE" });
Prediction.belongsTo(User, { foreignKey: "userId" });

DailyLog.hasOne(Prediction, { foreignKey: "dailyLogId", onDelete: "CASCADE" });
Prediction.belongsTo(DailyLog, { foreignKey: "dailyLogId" });

module.exports = {
  sequelize,
  User,
  DailyLog,
  Prediction,
};