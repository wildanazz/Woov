const mongoose = require('mongoose');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const User = mongoose.model('users');

const s3 = new aws.S3({
  accessKeyId: 'AKIAUBREA7IY2HVHOK7C ',
  secretAccessKey: '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',
  region: 'ap-southeast-2',
});

const upload = multer({
  storage: multerS3({
    s3,
    bucket: 'woov-prod',
    contentType: multerS3.AUTO_CONTENT_TYPE,
    metadata: (req, file, cb) => {
      cb(null, { ...req.body });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString());
    },
  }),
});

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
        user.image = req.file.location;
        await user.save(() => {
          res.status(200).send({ message: 'Image uploaded' });
        });
      } catch (err) {
        console.log(err);
      }
    }
  );
};
