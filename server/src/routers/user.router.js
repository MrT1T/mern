const express = require('express');
const usersController = require('../controllers/user');

const usersRouter = () => {
  const router = express.Router();

  router.get('/all', usersController.getUsers);
  router.put('/update', usersController.updateUser);

  return router;
};
module.exports = usersRouter;
