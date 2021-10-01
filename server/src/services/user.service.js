const User = require('../models/User.model');
const { quantityPage } = require('../constant/page.const');
const { regField } = require('../helpers/filter.helper');

const userService = {
  getFilteredUsers: async (data) => {
    const { page, ...filter } = data;
    const filterItem = regField(filter);

    const users = await User.find(filterItem, { _id: 0 });

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
  getUser: async (username) => User.findOne({ username }),
  getUsers: async () =>
    User.find(
      {},
      { _id: 0, firstName: 0, lastName: 0, email: 0, id: 0, groupsList: 0 }
    )
};
module.exports = userService;
