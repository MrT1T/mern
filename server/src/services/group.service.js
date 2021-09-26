const Group = require('../models/Group.model');
const { quantityPage } = require('../constant/page.const');

const groupService = {
  getFilteredGroups: async (data) => {
    let groups = await Group.find();
    const countPages = Math.ceil(groups.length / quantityPage);
    if (data.name) {
      groups = groups.filter((group) => group.name === data.name);
    }
    if (data.title) {
      groups = groups.filter((group) => group.title === data.title);
    }
    if (data.usersList) {
      groups = groups.filter((group) =>
        group.usersList.includes(data.usersList)
      );
    }
    const needQuantity = (data.page || 1) * quantityPage;
    groups.splice(needQuantity);

    return { groups, countPages };
  },
  updateGroup: async (data) => {
    await Group.updateOne(
      {
        groupId: data.groupId
      },
      {
        name: data.name,
        title: data.title,
        usersList: data.usersList
      }
    );
  }
};
module.exports = groupService;
