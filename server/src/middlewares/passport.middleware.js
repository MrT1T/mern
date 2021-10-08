const passport = require('passport');
const PassportJwt = require('passport-jwt');
const config = require('config');
const User = require('../models/User.model');

passport.use(User.createStrategy());

function registration(req, res, next) {
  const user = new User({
    email: req.body.email,
    username: req.body.username,
    firstName: req.body.firstName,
    lastName: req.body.lastName
  });

  // eslint-disable-next-line no-shadow
  User.register(user, req.body.password, (error, user) => {
    if (error) {
      next(error);
      return;
    }

    req.user = user;
    next();
  });
}

passport.use(
  new PassportJwt.Strategy(
    {
      jwtFromRequest: PassportJwt.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('secret')
    },
    (payload, done) => {
      User.findById(payload.sub)
        .then((user) => {
          if (user) {
            done(null, user);
          } else {
            done(null, false);
          }
        })
        .catch((error) => {
          done(error, false);
        });
    }
  )
);

module.exports = {
  registration,
  signIn: passport.authenticate('local', {
    session: false,
    failWithError: true
  }),
  verifyToken: passport.authenticate('jwt', { session: false })
};
