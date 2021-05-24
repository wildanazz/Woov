const passport = require('passport');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { check, validationResult } = require('express-validator');
const { sendRecoveryPasswordEmail } = require('../services/nodemailer');

const User = mongoose.model('users');

module.exports = (app) => {
  app.get('/api/current_user', (req, res) => {
    res.status(200).send(req.user);
  });

  app.post('/api/signin', passport.authenticate('local'), (req, res) => {
    if (req.body.rememberMe) {
      req.session.cookie.maxAge = 30 * 24 * 60 * 60 * 1000;
    } else {
      req.session.cookie.expires = false;
    }
    res.status(200).send({ message: 'Sign In Success!' });
  });

  app.get('/api/signout', (req, res) => {
    req.session.destroy();
    res.status(200).send({ message: 'Logout Success!' });
  });

  app.get('/api/auth/confirm/:confirmationCode', async (req, res) => {
    const { confirmationCode } = req.params;
    try {
      const user = await User.findOne({
        confirmationCode,
      });
      if (!user) {
        res.status(404).send({ message: 'User not found!' });
      }
      user.status = 'Active';
      await user.save(() => {
        res.status(200).send({ message: 'User status has been confirmed!' });
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.post('/api/reset/confirm/email', async (req, res) => {
    const { host } = req.headers;
    const { email } = req.body;
    const user = await User.findOne({ email });
    try {
      if (!user) {
        res.status(404).send({ message: 'User not found!' });
      }
      const token = jwt.sign({ email }, 'drowssap');
      user.resetPasswordToken = token;
      await user.save(() => {
        sendRecoveryPasswordEmail(host, user);
        res.status(200).send({ message: 'Confirmation email has been sent!' });
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.post(
    '/api/reset/password/:resetPasswordToken',
    [
      check('password')
        .not()
        .isEmpty()
        .isLength({ min: 6 })
        .withMessage('Must be at least 6 chars long'),
      check('confirmPassword', 'Passwords do not match').custom(
        (value, { req }) => value === req.body.password
      ),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
        });
      }
      const { resetPasswordToken } = req.params;
      const { password } = req.body;
      try {
        const user = await User.findOne({ resetPasswordToken });
        if (!user) {
          res.status(404).send({ message: 'User not found!' });
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        user.password = hashPassword;
        user.resetPasswordToken = undefined;
        await user.save(() => {
          res.send({ message: 'Your password has been reset!' });
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
};
