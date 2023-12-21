const User = require('../models/User.model');
const Project = require('../models/Group.model');
const usersData = require('./user.data');
const projectsData = require('./group.data');

const initial = async () => {
  await User.create(usersData);
  await Project.create(projectsData);
};

module.exports = initial;
