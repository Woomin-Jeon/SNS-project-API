const express = require('express');
const session = require('express-session');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const logger = require('./logs/winston');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

const Sentry = require('@sentry/node');
Sentry.init({ dsn: process.env.SENTRY_DSN });

app.use(express.json());
app.use(cors({ origin: "http://localhost:8080", credentials: true }));
app.use(helmet());
app.use(compression());
app.use(session({
  secret : 'JEONWOOMINFACEBOOKSESSION',
  resave: true,
  saveUninitialized: false,
  cookie: {},
}));

/*
app.all('/*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://woomin-facebook.s3-website.ap-northeast-2.amazonaws.com');
  res.header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE');
  res.header('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  res.header('Access-Control-Allow-Credentials', true);
  next();
});
*/

app.use('/socket', require('./routes/socket'));
app.use('/profile', require('./routes/profile'));
app.use('/upload', require('./routes/upload'));
app.use('/session', require('./routes/session'));
app.use('/login', require('./routes/login'));
app.use('/friends', require('./routes/friends'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));
app.use('/childcomments', require('./routes/childcomments'));
app.use('/like', require('./routes/like'));
app.use('/commentlike', require('./routes/commentlike'));
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Server Error');
});

module.exports = app;
