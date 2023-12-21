const express = require('express');
const userRouter = require('./user.router');
const projectRouter = require('./group.router');
const authRouter = require('./auth.router');

const apiRouter = () =>
  express
    .Router()
    .use('/auth', authRouter())
    .use('/user', userRouter())
    .use('/project', projectRouter());
module.exports = apiRouter;
