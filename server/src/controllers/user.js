const User = require('../models/User.model');

const userController = {
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.send(users);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      await User.updateOne(
        {
          id: req.body.id
        },
        {
          username: req.body.username,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email
        }
      );

      res.send('User has been changed');
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
};

module.exports = userController;
