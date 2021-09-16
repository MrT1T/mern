const express = require('express');
const usersController = require('../controllers/users.controller');

const usersRouter = () => {
  const router = express.Router();

  router.get('/', usersController.getUsers);
  router.get('/:userId', usersController.getUser);

  return router;
};
module.exports = usersRouter;
