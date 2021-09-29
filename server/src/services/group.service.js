const Group = require('../models/Group.model');
const { quantityPage } = require('../constant/page.const');
const { regField } = require('../helpers/filter.helper');

const groupService = {
  getFilteredGroups: async (data) => {
    const { page, ...filter } = data;
    const filterItem = regField(filter);

    const groups = await Group.find(filterItem, { _id: 0 });

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
