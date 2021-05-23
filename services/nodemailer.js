const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'wildanazzwa@gmail.com',
    pass: 'Interceptor24',
  },
});

module.exports = (email, confirmationCode) => {
  try {
    transport.sendMail({
      from: 'wildanazzwa@gmail.com',
      to: email,
      subject: 'Please confirm your account',
      html: `<h1>Email Confirmation</h1>
        <h2>Hello</h2>
        <p>Thank you for subscribing. Please confirm your email by clicking on the following link</p>
        <a href=http://localhost:3000/confirm/${confirmationCode}> Click here</a>
        </div>`,
    });
  } catch (err) {
    console.log(err);
  }
};
