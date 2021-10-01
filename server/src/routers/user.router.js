const express = require('express');
const usersController = require('../controllers/user');
const validationError = require('../helpers/validationError.helper');
const { updateUserValidation } = require('../middleware/validation.middleware');

const usersRouter = () => {
  const router = express.Router();

  router.get('/filter', usersController.getFilteredUsers);
  router.get('/all', usersController.getUsers);
  router.put(
    '/update',
    [...updateUserValidation, validationError],
    usersController.updateUser
  );
  router.get('/:username', usersController.getUser);

  return router;
};
module.exports = usersRouter;
