const User = require('../models/User.model');
const { quantityPage } = require('../constant/page.const');
const { filter, listFilter } = require('../helpers/filter.helper');

const userService = {
  getFilteredUsers: async ({
    username,
    firstName,
    lastName,
    email,
    groupsList,
    page
  }) => {
    let users = await User.find();

    if (username) {
      users = filter(users, 'username', username);
    }
    if (firstName) {
      users = filter(users, 'firstName', firstName);
    }
    if (lastName) {
      users = filter(users, 'lastName', lastName);
    }
    if (email) {
      users = filter(users, 'email', email);
    }
    if (groupsList) {
      users = listFilter(users, 'groupsList', groupsList);
    }

    const countPages = Math.ceil(users.length / quantityPage);

    const needQuantity = (page || 1) * quantityPage;
    users.splice(needQuantity);

    return { users, countPages };
  },
  updateUser: async ({
    id,
    username,
    firstName,
    lastName,
    email,
    groupsList
  }) => {
    await User.updateOne(
      {
        id
      },
      {
        username,
        firstName,
        lastName,
        email,
        groupsList
      }
    );
  },
  getUser: async (username) => User.findOne({ username })
};
module.exports = userService;
