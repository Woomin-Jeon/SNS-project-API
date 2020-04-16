const mongoose = require('mongoose');
const logger = require('../logs/winston');

const db = mongoose.connection;
db.on('error', (err) => {
  logger.info(err);
});

db.once('open', () => {
  logger.info("mongoDB is connected");
});

logger.info(process.env.MONGODB_URI);

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).catch(err => logger.info(err.stack));

module.exports = db;
