const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const DailyLog = sequelize.define("DailyLog", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
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
    defaultValue: false,
  },
}, {
  timestamps: true,
});

module.exports = DailyLog;