const User = require('../models/User.model');
const Group = require('../models/Group.model');
const { quantityPage } = require('../constant/page.const');
const { regField } = require('../helpers/filter.helper');
const difference = require('../helpers/difference.helper');

const userService = {
  getFilteredUsers: async (data) => {
    const { page, groupsList, ...filter } = data;
    const filterItem = regField(filter);

    let users = await User.find(filterItem, { _id: 0 }).populate({
      path: 'groupsList',
      select: 'name -_id'
    });

    if (groupsList) {
      users = users.filter((group) =>
        group.groupsList.some(({ name }) =>
          name.toUpperCase().includes(groupsList.toUpperCase())
        )
      );
    }

    const pagesCount = Math.ceil(users.length / quantityPage);

    const needQuantity = (page || 1) * quantityPage;
    users.splice(needQuantity);

    return { users, pagesCount };
  },
  updateUser: async ({
    id,
    username,
    firstName,
    lastName,
    email,
    groupsList
  }) => {
    const oldUser = await User.findOne({ id });
    const oldGroupsList = oldUser.groupsList;
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
    const addedGroups = difference(groupsList, oldGroupsList);
    const removedGroups = difference(oldGroupsList, groupsList);
    await Group.updateMany(
      { _id: addedGroups },
      { $addToSet: { usersList: oldUser._id } }
    );
    await Group.updateMany(
      { _id: removedGroups },
      { $pull: { usersList: oldUser._id } }
    );
  },
  getUser: async (username) =>
    User.findOne({ username }).populate({
      path: 'groupsList',
      select: 'name'
    }),
  getUsers: async () =>
    User.find({}, { firstName: 0, lastName: 0, email: 0, id: 0, groupsList: 0 })
};
module.exports = userService;
