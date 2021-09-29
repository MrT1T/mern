const express = require('express');
const usersController = require('../controllers/user');

const usersRouter = () => {
  const router = express.Router();

  router.get('/all', usersController.getUsers);
  router.put('/update', usersController.updateUser);
  router.get('/:username', usersController.getUser);

  return router;
};
module.exports = usersRouter;
