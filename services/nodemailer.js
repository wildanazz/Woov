const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wildanazzwa@gmail.com',
    pass: 'Interceptor24',
  },
});

module.exports = {
  sendConfirmatonEmail: (email, confirmationCode) => {
    try {
      transport.sendMail({
        to: email,
        from: 'wildanazzwa@gmail.com',
        subject: 'Please confirm your account',
        html: `<h1>Email Confirmation</h1>
          <h2>Hello ${email}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
          </div>`,
      });
    } catch (err) {
      console.log(err);
    }
  },
  sendRecoveryPasswordEmail: (email, resetPasswordToken) => {
    try {
      transport.sendMail({
        to: email,
        from: 'wildanazzwa@gmail.com',
        subject: 'Password change request',
        html: `<h1>Reset Password</h1>
        <h2>Hello ${email}</h2>
        <p>Please click on the following link to reset your password</p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        <a href=http://localhost:3000/reset/password/${resetPasswordToken}> Click here</a>`,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
