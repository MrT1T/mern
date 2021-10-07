const express = require('express');
const usersController = require('../controllers/user');
const validationError = require('../helpers/validation-error.helper');
const {
  updateUserValidation
} = require('../middlewares/validation.middleware');
const { verifyToken } = require('../middlewares/passport.middleware');

const usersRouter = () => {
  const router = express.Router();

  router.get('/filter', verifyToken, usersController.getFilteredUsers);
  router.get('/all', verifyToken, usersController.getUsers);
  router.put(
    '/update',
    [...updateUserValidation, verifyToken, validationError],
    usersController.updateUser
  );
  router.get('/:username', verifyToken, usersController.getUser);

  return router;
};
module.exports = usersRouter;
