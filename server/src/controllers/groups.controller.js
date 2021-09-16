const groupsController = {
  getGroups: async (req, res) => {
    try {
      res.send();
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
  getGroup: async (req, res) => {
    try {
      res.send();
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
};

module.exports = groupsController;
