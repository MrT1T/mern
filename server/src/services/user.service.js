const User = require('../models/User.model');
const Project = require('../models/Group.model');
const { quantityPage } = require('../constant/page.const');
const { regField } = require('../helpers/filter.helper');
const difference = require('../helpers/difference.helper');

const userService = {
  getFilteredUsers: async (data) => {
    const { page, projectsList, ...filter } = data;
    const filterItem = regField(filter);

    let users = await User.find(filterItem, { _id: 0 }).populate({
      path: 'projectsList',
      select: 'name -_id'
    });

    if (projectsList) {
      users = users.filter((project) =>
        project.projectsList.some(({ name }) =>
          name.toUpperCase().includes(projectsList.toUpperCase())
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
    projectsList
  }) => {
    const oldUser = await User.findOne({ id });
    const oldProjectsList = oldUser.projectsList;
    await User.updateOne(
      {
        id
      },
      {
        username,
        firstName,
        lastName,
        email,
        projectsList
      }
    );
    const addedProjects = difference(projectsList, oldProjectsList);
    const removedProjects = difference(oldProjectsList, projectsList);
    await Project.updateMany(
      { _id: addedProjects },
      { $addToSet: { usersList: oldUser._id } }
    );
    await Project.updateMany(
      { _id: removedProjects },
      { $pull: { usersList: oldUser._id } }
    );
  },
  getUser: async (username) =>
    User.findOne({ username }).populate({
      path: 'projectsList',
      select: 'name'
    }),
  getUsers: async () =>
    User.find(
      {},
      { firstName: 0, lastName: 0, email: 0, id: 0, projectsList: 0 }
    )
};
module.exports = userService;
