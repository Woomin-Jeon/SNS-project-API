const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../logs/winston');

dotenv.config();

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  logger.info("mongoDB... connect plz... I want you...love");
});

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).catch(err => logger.info(err));

module.exports = db;
