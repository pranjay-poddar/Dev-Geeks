const JwtStategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('users');
const { getSetting } = require('./settings.helper');


module.exports = async passport => {
  const secretOrKey = await getSetting('auth', 'token', 'secret_key');
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey
  };
  passport.use(
    new JwtStategy(opts, (jwtPayload, done) => {
      User.findById(jwtPayload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    }),
  );
};
