const createError = require('http-errors');
const {
  getFilteredGroups,
  updateGroup,
  getGroup,
  getGroups
} = require('../services/group.service');

const groupController = {
  getFilteredGroups: async (req, res, next) => {
    try {
      const result = await getFilteredGroups(req.query);

      res.send(result);
    } catch (error) {
      next(error);
    }
  },
  getGroups: async (req, res, next) => {
    try {
      const result = await getGroups();

      if (!result) {
        throw createError(500);
      }

      res.send(result);
    } catch (error) {
      next(error);
    }
  },
  updateGroup: async (req, res, next) => {
    try {
      await updateGroup(req.body);

      res.send('Group has been changed');
    } catch (error) {
      next(error);
    }
  },
  getGroup: async (req, res, next) => {
    try {
      const group = await getGroup(req.params.groupname);

      if (!group) {
        throw createError(406);
      }

      res.send(group);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = groupController;
