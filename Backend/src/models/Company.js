const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Company = sequelize.define('Company', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  website: DataTypes.STRING,
  location: DataTypes.STRING,
  description: DataTypes.TEXT,
  industry: DataTypes.STRING
});

module.exports = Company;