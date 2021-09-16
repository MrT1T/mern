const usersController = {
  getUsers: async (req, res) => {
    try {
      res.send();
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  },
  getUser: async (req, res) => {
    try {
      res.send();
    } catch (e) {
      res.status(500).send({ message: e.message });
    }
  }
};

module.exports = usersController;
