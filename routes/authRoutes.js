const passport = require('passport');

module.exports = (app) => {
  app.get('/api/current_user', (req, res) => {
    res.status(200).send(req.user);
  });

  app.get(
    '/auth/google',
    passport.authenticate('google', {
      scope: ['profile', 'email'],
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      res.redirect('/');
    }
  );

  app.post('/api/signin', passport.authenticate('local'), (req, res) => {
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
      req.session.cookie.expires = false;
    }
    res.sendStatus(200);
  });

  app.get('/api/signout', (req, res) => {
    req.session.destroy();
    res.status(200).redirect('/');
  });
};
