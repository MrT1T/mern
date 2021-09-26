const { getFilteredGroups, updateGroup } = require('../services/group.service');
const { createErrorMessage } = require('../services/errors.service');

const groupController = {
  getGroups: async (req, res) => {
    try {
      const result = await getFilteredGroups(req.query);

      res.send(result);
    } catch (e) {
      const message = await createErrorMessage(500);
      res.status(500).send({ message });
    }
  },
  updateGroup: async (req, res) => {
    try {
      await updateGroup(req.body);

      res.send('Group has been changed');
    } catch (e) {
      const message = await createErrorMessage(500);
      res.status(500).send({ message });
    }
  }
};

module.exports = groupController;
