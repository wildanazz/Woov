const express = require('express');
const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const { mongoURI } = require('./configs/keys');
require('./models/User');
require('./services/passport');

// Connect to mongodb database
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.once('open', () => {
  console.log(`Database connected to ${mongoURI}`);
});

db.on('error', (err) => {
  console.log(err);
});

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'woov',
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/signUpRoutes')(app);
require('./routes/profileRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}...`);
});
