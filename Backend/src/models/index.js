const User = require('./User');
const Company = require('./Company');
const Application = require('./Application');
const Interview = require('./Interview');
const SavedJob = require('./SavedJob');

// Existing relationships
User.hasMany(Application);
Application.belongsTo(User);

Company.hasMany(Application);
Application.belongsTo(Company);

Application.hasMany(Interview);
Interview.belongsTo(Application);

// New relationships for SavedJob
User.hasMany(SavedJob);
SavedJob.belongsTo(User);

module.exports = {
  User,
  Company,
  Application,
  Interview,
  SavedJob
};