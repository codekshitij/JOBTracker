const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Application = sequelize.define('Application', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('saved', 'applied', 'interviewing', 'offered', 'rejected', 'accepted'),
    defaultValue: 'saved'
  },
  jobType: {
    type: DataTypes.ENUM('full-time', 'part-time', 'contract', 'internship'),
    allowNull: false
  },
  location: DataTypes.STRING,
  salary: DataTypes.STRING,
  applicationDate: DataTypes.DATE,
  applicationLink: DataTypes.STRING,
  jobDescription: DataTypes.TEXT,
  notes: DataTypes.TEXT
});

module.exports = Application;