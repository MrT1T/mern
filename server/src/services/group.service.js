const Project = require('../models/Group.model');
const { quantityPage } = require('../constant/page.const');
const { regField } = require('../helpers/filter.helper');
const User = require('../models/User.model');
const difference = require('../helpers/difference.helper');

const projectService = {
  getFilteredProjects: async (data) => {
    const { page, usersList, ...filter } = data;
    const filterItem = regField(filter);

    let projects = await Project.find(filterItem, { _id: 0 }).populate({
      path: 'usersList',
      select: 'username -_id'
    });

    if (usersList) {
      projects = projects.filter((project) =>
        project.usersList.some(({ username }) =>
          username.toUpperCase().includes(usersList.toUpperCase())
        )
      );
    }

    const pagesCount = Math.ceil(projects.length / quantityPage);

    const needQuantity = (page || 1) * quantityPage;
    projects.splice(needQuantity);

    return { projects, pagesCount };
  },
  updateProject: async ({ projectId, name, title, usersList }) => {
    const oldProject = await Project.findOne({ projectId });
    const oldUsersList = oldProject.usersList;

    await Project.updateOne(
      {
        projectId
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
      { $addToSet: { projectsList: oldProject._id } }
    );
    await User.updateMany(
      { _id: removedUsers },
      { $pull: { projectsList: oldProject._id } }
    );
  },
  getProject: async (name) =>
    Project.findOne({ name }).populate({
      path: 'usersList',
      select: 'username'
    }),
  getProjects: async () =>
    Project.find({}, { title: 0, usersList: 0, projectId: 0 })
};
module.exports = projectService;
