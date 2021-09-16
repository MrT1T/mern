const express = require('express');
const usersRouter = require('./users.route');

const apiRouter = () => {
  const router = express
    .Router()

    .use((req, res, next) => {
      res.header(
        'Access-Control-Allow-Headers',
        'x-access-token, Origin, Content-Type, Accept'
      );
      next();
    })
    .use('/users', usersRouter());

  return router;
};
module.exports = apiRouter;
