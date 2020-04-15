const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../logs/winston');

dotenv.config();

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  logger.info("mongoDB is connected on port 27017...");
});

mongoose.connect(process.env.DB_PRODUCTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = db;
