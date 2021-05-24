const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
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
      const { host } = req.headers;
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({
          errors: errors.array(),
        });
      }
      const { firstName, lastName, email, password } = req.body;
      try {
        const user = await User.findOne({
          email,
        });
        if (user) {
          res.status(404).send({ message: 'User already exist!' });
        }
        const hashPassword = bcrypt.hashSync(password, 10);
        const token = jwt.sign({ email }, 'password');
        const newUser = new User({
          firstName,
          lastName,
          email,
          password: hashPassword,
          confirmationCode: token,
        });
        await newUser.save(() => {
          sendConfirmatonEmail(host, newUser);
          res
            .status(200)
            .send({ message: 'Confirmation email has been sent!' });
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
};
