const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../logs/winston');

dotenv.config();

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  logger.info("MongoDB is connected ");
});

mongoose.connect(process.env.MONGODB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).catch(err => logger.info(err));

module.exports = db;
