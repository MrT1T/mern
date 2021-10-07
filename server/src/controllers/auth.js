const createError = require('http-errors');
const { createToken } = require('../services/auth.service');

const authController = {
  getToken: async (req, res, next) => {
    try {
      const token = await createToken(req.user);
      if (!token) {
        throw createError(401);
      }
      res.json({ token });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = authController;
