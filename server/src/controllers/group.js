const createError = require('http-errors');
const {
  getFilteredProjects,
  updateProject,
  getProject,
  getProjects
} = require('../services/group.service');

const projectController = {
  getFilteredProjects: async (req, res, next) => {
    try {
      const result = await getFilteredProjects(req.query);

      res.send(result);
    } catch (error) {
      next(error);
    }
  },
  getProjects: async (req, res, next) => {
    try {
      const result = await getProjects();

      if (!result) {
        throw createError(500);
      }

      res.send(result);
    } catch (error) {
      next(error);
    }
  },
  updateProject: async (req, res, next) => {
    try {
      await updateProject(req.body);

      res.send('Project has been changed');
    } catch (error) {
      next(error);
    }
  },
  getProject: async (req, res, next) => {
    try {
      const project = await getProject(req.params.projectname);

      if (!project) {
        throw createError(406);
      }

      res.send(project);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = projectController;
