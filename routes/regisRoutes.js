const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

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
          return res.status(400).json({
            msg: 'User already exists!',
          });
        }
        const newUser = new User({
          firstName,
          lastName,
          email,
          password,
        });
        await newUser.save();
      } catch (err) {
        console.log(err.message);
        res.status(500).send('Error in saving!');
      }
      return res.sendStatus(200);
    }
  );
};
