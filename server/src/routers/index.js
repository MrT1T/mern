const express = require('express');
const userRouter = require('./user.router');
const groupRouter = require('./group.router');

const apiRouter = () =>
  express.Router().use('/user', userRouter()).use('/group', groupRouter());
module.exports = apiRouter;
