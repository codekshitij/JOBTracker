const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Interview = sequelize.define('Interview', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  type: {
    type: DataTypes.ENUM('phone', 'technical', 'behavioral', 'onsite', 'take-home'),
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duration: DataTypes.INTEGER, // in minutes
  interviewer: DataTypes.STRING,
  notes: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('scheduled', 'completed', 'cancelled'),
    defaultValue: 'scheduled'
  }
});

module.exports = Interview;