const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const { sendConfirmatonEmail } = require('../services/nodemailer');

const User = mongoose.model('users');

module.exports = (app) => {
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
          sendConfirmatonEmail(newUser.email, newUser.confirmationCode);
        });
      } catch (err) {
        console.log(err);
      }
      return res.sendStatus(200);
    }
  );
};
