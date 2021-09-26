const User = require('../models/User.model');
const { quantityPage } = require('../constant/page.const');

const userService = {
  getFilteredUsers: async (data) => {
    let users = await User.find();
    const countPages = Math.ceil(users.length / quantityPage);
    if (data.username) {
      users = users.filter((user) => user.username === data.username);
    }
    if (data.firstName) {
      users = users.filter((user) => user.firstName === data.firstName);
    }
    if (data.lastName) {
      users = users.filter((user) => user.lastName === data.lastName);
    }
    if (data.email) {
      users = users.filter((user) => user.email === data.email);
    }
    if (data.groupsList) {
      users = users.filter((user) => user.groupsList.includes(data.groupsList));
    }
    const needQuantity = (data.page || 1) * quantityPage;
    users.splice(needQuantity);

    return { users, countPages };
  },
  updateUser: async (data) => {
    await User.updateOne(
      {
        id: data.id
      },
      {
        username: data.username,
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        groupsList: data.groupsList
      }
    );
  }
};
module.exports = userService;
