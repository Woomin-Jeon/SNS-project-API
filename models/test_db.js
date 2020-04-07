const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../logs/winston');

dotenv.config();

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  logger.info("TEST DB ON");
});

mongoose.connect(process.env.DB_TEST, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = db;
