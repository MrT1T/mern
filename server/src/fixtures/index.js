const User = require('../models/User.model');
const Group = require('../models/Group.model');
const usersData = require('./user.data');
const groupsData = require('./group.data');

const initial = async () => {
  await User.create(usersData);
  await Group.create(groupsData);
};

module.exports = initial;
