const express = require('express');
const { getToken } = require('../controllers/auth');
const { registration, signIn } = require('../middlewares/passport.middleware');

const authRouter = () => {
  const router = express.Router();

  router.post('/registration', registration, getToken);
  router.post('/signin', signIn, getToken);

  return router;
};
module.exports = authRouter;
