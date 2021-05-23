const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wildanazzwa@gmail.com',
    pass: 'Interceptor24',
  },
});

module.exports = {
  sendConfirmatonEmail: (host, user) => {
    const { email, confirmationCode } = user;
    try {
      transport.sendMail({
        to: email,
        from: 'wildanazzwa@gmail.com',
        subject: 'Please confirm your account',
        html: `<h1>Email Confirmation</h1>
          <h2>Hi ${email}</h2>
          <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
          <a href=http://${host}/confirm/${confirmationCode}> Click here</a>`,
      });
    } catch (err) {
      console.log(err);
    }
  },
  sendRecoveryPasswordEmail: (host, user) => {
    const { email, resetPasswordToken } = user;
    try {
      transport.sendMail({
        to: email,
        from: 'wildanazzwa@gmail.com',
        subject: 'Password change request',
        html: `<h1>Reset Password</h1>
        <h2>Hello ${email}</h2>
        <p>Please click on the following link to reset your password</p>
        <a href=http://${host}/reset/password/${resetPasswordToken}> Click here</a>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
