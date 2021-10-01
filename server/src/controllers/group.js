const createError = require('http-errors');
const {
  getFilteredGroups,
  updateGroup,
  getGroup
} = require('../services/group.service');

const groupController = {
  getGroups: async (req, res, next) => {
    try {
      const result = await getFilteredGroups(req.query);

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
