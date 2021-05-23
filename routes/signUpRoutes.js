const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const sendConfirmationEmail = require('../services/nodemailer');

const User = mongoose.model('users');

module.exports = (app) => {
  app.get('/api/auth/confirm/:confirmationCode', async (req, res) => {
    const { confirmationCode } = req.params;
    try {
      const user = await User.findOne({
        confirmationCode,
      });
      if (!user) {
        return res.status(404).send({ message: 'User not found!' });
      }
      user.status = 'Active';
      await user.save();
    } catch (err) {
      console.log(err);
    }
    return res.sendStatus(200);
  });

  app.post(
    '/api/signup',
    [
      check('email', 'Please enter a valid email').isEmail(),
      check('password', 'Please enter a valid password').isLength({
        min: 6,
      }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
        });
      }
      const { firstName, lastName, email, password } = req.body;
      try {
        const user = await User.findOne({
          email,
        });
        if (user) {
          return res.status(404).send({ message: 'User already exist!' });
        }
        const token = jwt.sign({ email }, 'password');
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
          confirmationCode: token,
        });
        await newUser.save(() => {
          sendConfirmationEmail(newUser.email, newUser.confirmationCode);
        });
      } catch (err) {
        console.log(err);
      }
      return res.sendStatus(200);
    }
  );
};
