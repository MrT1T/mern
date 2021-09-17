const Group = require('../models/Group.model');

const groupController = {
  getGroups: async (req, res) => {
    try {
      const groups = await Group.find();
      res.send(groups);
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
  updateGroup: async (req, res) => {
    try {
      await Group.updateOne(
        {
          groupId: req.body.groupId
        },
        {
          name: req.body.name,
          title: req.body.title,
          usersList: req.body.usersList
        }
      );

      res.send('Group has been changed');
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
};

module.exports = groupController;
