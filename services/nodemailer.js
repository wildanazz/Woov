const nodemailer = require('nodemailer');
const { google } = require('googleapis');

const { OAuth2 } = google.auth;

const oauth2Client = new OAuth2(
  '787392375813-dd3hejgqnq0iig7ps69mo30dg26gs14p.apps.googleusercontent.com',
  '4jTpTQHcua38CFRz9XCCRkEO',
  'https://developers.google.com/oauthplayground'
);

oauth2Client.setCredentials({
  refresh_token:
    '1//04PAZggyTGjIWCgYIARAAGAQSNwF-L9IrVBLGJ1kXBCU8IBDg11No-BQ2W4i0351tY-tlAqbAVEp1cT_Am1ONxuc5gWiqV-iW4fE',
});

const accessToken = oauth2Client.getAccessToken();

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: 'wildanazzwa@gmail.com',
    clientId:
      '787392375813-dd3hejgqnq0iig7ps69mo30dg26gs14p.apps.googleusercontent.com',
    clientSecret: '4jTpTQHcua38CFRz9XCCRkEO',
    refreshToken:
      '1//04PAZggyTGjIWCgYIARAAGAQSNwF-L9IrVBLGJ1kXBCU8IBDg11No-BQ2W4i0351tY-tlAqbAVEp1cT_Am1ONxuc5gWiqV-iW4fE',
    accessToken,
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
