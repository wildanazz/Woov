const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const User = mongoose.model('users');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({ storage });

module.exports = (app) => {
  app.post('/api/edit/profile/info/:userId', async (req, res) => {
    const { userId } = req.params;
    const { firstName, lastName } = req.body;
    try {
      const user = await User.findById(userId);
      user.firstName = firstName;
      user.lastName = lastName;
      await user.save(() => {
        res.status(200).send({ message: 'Info updated!' });
      });
    } catch (err) {
      console.log(err);
    }
  });

  app.post(
    '/api/edit/profile/image/:userId',
    upload.single('file'),
    async (req, res) => {
      const { userId } = req.params;
      try {
        const user = await User.findById(userId);
        user.image = {
          data: fs.readFileSync(
            path.join(`${process.cwd()}/uploads/${req.file.filename}`)
          ),
          contentType: 'image/png',
        };
        user.save(() => {
          res.status(200).send({ message: 'File uploaded!' });
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
};
