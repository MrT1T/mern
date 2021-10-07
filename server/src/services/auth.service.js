const JWT = require('jsonwebtoken');
const config = require('config');

const authService = {
  createToken: async ({ email, _id }) =>
    JWT.sign(
      {
        email
      },
      config.get('secret'),
      {
        expiresIn: config.get('jwtExpires'),
        subject: _id.toString()
      }
    )
};

module.exports = authService;
