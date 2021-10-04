const Group = require('../models/Group.model');
const { quantityPage } = require('../constant/page.const');
const { regField } = require('../helpers/filter.helper');
const User = require('../models/User.model');
const difference = require('../helpers/difference.helper');

const groupService = {
  getFilteredGroups: async (data) => {
    const { page, usersList, ...filter } = data;
    const filterItem = regField(filter);

    let groups = await Group.find(filterItem, { _id: 0 }).populate({
      path: 'usersList',
      select: 'username -_id'
    });

    if (usersList) {
      groups = groups.filter((group) =>
        group.usersList.some(({ username }) =>
          username.toUpperCase().includes(usersList.toUpperCase())
        )
      );
    }

    const countPages = Math.ceil(groups.length / quantityPage);

    const needQuantity = (page || 1) * quantityPage;
    groups.splice(needQuantity);

    return { groups, countPages };
  },
  updateGroup: async ({ groupId, name, title, usersList }) => {
    const oldGroup = await Group.findOne({ groupId });
    const oldUsersList = oldGroup.usersList;

    await Group.updateOne(
      {
        groupId
      },
      {
        name,
        title,
        usersList
      }
    );
    const addedUsers = difference(usersList, oldUsersList);
    const removedUsers = difference(oldUsersList, usersList);
    await User.updateMany(
      { _id: addedUsers },
      // eslint-disable-next-line no-underscore-dangle
      { $addToSet: { groupsList: oldGroup._id } }
    );
    await User.updateMany(
      { _id: removedUsers },
      // eslint-disable-next-line no-underscore-dangle
      { $pull: { groupsList: oldGroup._id } }
    );
  },
  getGroup: async (name) =>
    Group.findOne({ name }).populate({
      path: 'usersList',
      select: 'username'
    }),
  getGroups: async () => Group.find({}, { title: 0, usersList: 0, groupId: 0 })
};
module.exports = groupService;
