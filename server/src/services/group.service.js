const Group = require('../models/Group.model');
const { quantityPage } = require('../constant/page.const');
const { filter, listFilter } = require('../helpers/filter.helper');

const groupService = {
  getFilteredGroups: async ({ name, title, usersList, page }) => {
    let groups = await Group.find();

    if (name) {
      groups = filter(groups, 'name', name);
    }
    if (title) {
      groups = filter(groups, 'title', title);
    }

    if (usersList) {
      groups = listFilter(groups, 'usersList', usersList);
    }

    const countPages = Math.ceil(groups.length / quantityPage);

    const needQuantity = (page || 1) * quantityPage;
    groups.splice(needQuantity);

    return { groups, countPages };
  },
  updateGroup: async ({ groupId, name, title, usersList }) => {
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
  },
  getGroup: async (name) => Group.findOne({ name })
};
module.exports = groupService;
