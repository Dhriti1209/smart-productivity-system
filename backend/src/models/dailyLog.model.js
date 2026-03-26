const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const User = require("./user.model");

const DailyLog = sequelize.define("DailyLog", {
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  sleepHours: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  studyHours: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  mood: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tasksPlanned: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  tasksCompleted: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  distractions: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  exercise: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  focusLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  energyLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  stressLevel: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
});

User.hasMany(DailyLog, { foreignKey: "userId" });
DailyLog.belongsTo(User, { foreignKey: "userId" });

module.exports = DailyLog;