const createError = require('http-errors');
const {
  updateUser,
  getFilteredUsers,
  getUser
} = require('../services/user.service');

const userController = {
  getUsers: async (req, res, next) => {
    try {
      const users = await getFilteredUsers(req.query);
      res.send(users);
    } catch (error) {
      next(error);
    }
  },
  updateUser: async (req, res, next) => {
    try {
      await updateUser(req.body);

      res.send('User has been changed');
    } catch (error) {
      next(error);
    }
  },
  getUser: async (req, res, next) => {
    try {
      const user = await getUser(req.params.username);

      if (!user) {
        throw createError(405);
      }

      res.send(user);
    } catch (error) {
      next(error);
    }
  }
};

module.exports = userController;
