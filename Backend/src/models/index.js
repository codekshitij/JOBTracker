const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// User Model
const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  }
});

// Company Model
const Company = sequelize.define('Company', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  website: DataTypes.STRING,
  description: DataTypes.TEXT
});

// Application Model
const Application = sequelize.define('Application', {
  jobTitle: {
    type: DataTypes.STRING,
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('applied', 'interviewing', 'offered', 'rejected', 'accepted'),
    defaultValue: 'applied'
  },
  applicationDate: DataTypes.DATE,
  notes: DataTypes.TEXT
});

// Define relationships
User.hasMany(Application);
Application.belongsTo(User);

Company.hasMany(Application);
Application.belongsTo(Company);

module.exports = {
  User,
  Company,
  Application
};