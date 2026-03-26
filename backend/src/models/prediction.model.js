const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const Prediction = sequelize.define("Prediction", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  productivityScore: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  burnoutRisk: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  recommendation: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Prediction;