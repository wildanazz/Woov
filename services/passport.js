const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },
    async (email, password, done) => {
      const user = await User.findOne({ email });
      if (!user) {
        return done(null, false);
      }
      if (user.password !== password) {
        return done(null, false);
      }
      if (user.status !== 'Active') {
        return done(null, false);
      }
      return done(null, user);
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID:
        '128282302973-5fh9fv86rsloavm9idve2bcjlbaagd4v.apps.googleusercontent.com',
      clientSecret: 'koNVnZc7id80Ojczw3OCSsMB',
      callbackURL: '/auth/google/callback',
      proxy: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const existingUser = await User.findOne({ googleId: profile.id });
      if (existingUser) {
        return done(null, existingUser);
      }
      const user = await new User({
        email: profile.emails[0].value,
        picture: profile.photos[0].value,
      }).save();
      return done(null, user);
    }
  )
);
