const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  image: {
    type: String,
  },
  videos: [
    {
      name: String,
      description: String,
      videoURL: String,
    },
  ],
  status: {
    type: String,
    enum: ['Pending', 'Active'],
    default: 'Pending',
  },
  confirmationCode: {
    type: String,
  },
  resetPasswordToken: {
    type: String,
  },
});

mongoose.model('users', UserSchema);
