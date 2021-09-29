const {
  updateUser,
  getFilteredUsers,
  getUser
} = require('../services/user.service');
const { createErrorMessage } = require('../services/errors.service');

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await getFilteredUsers(req.query);
      res.send(users);
    } catch (e) {
      const message = await createErrorMessage(500);
      res.status(500).send({ message });
    }
  },
  updateUser: async (req, res) => {
    try {
      await updateUser(req.body);

      res.send('User has been changed');
    } catch (e) {
      const message = await createErrorMessage(500);
      res.status(500).send({ message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await getUser(req.params.username);

      res.send(user);
    } catch (e) {
      const message = await createErrorMessage(500);
      res.status(500).send({ message });
    }
  }
};

module.exports = userController;
