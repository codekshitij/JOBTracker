const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const SavedJob = sequelize.define('SavedJob', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  location: DataTypes.STRING,
  jobType: {
    type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'internship'),
    allowNull: true
  },
  salary: DataTypes.STRING,
  jobLink: DataTypes.STRING,
  jobDescription: DataTypes.TEXT,
  notes: DataTypes.TEXT,
  priority: {
    type: DataTypes.ENUM('high', 'medium', 'low'),
    defaultValue: 'medium'
  },
  deadline: DataTypes.DATE,
  savedDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  remindOn: DataTypes.DATE,
  status: {
    type: DataTypes.ENUM('to_apply', 'applied', 'not_interested'),
    defaultValue: 'to_apply'
  }
});

module.exports = SavedJob;
