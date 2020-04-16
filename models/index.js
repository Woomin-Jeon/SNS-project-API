const mongoose = require('mongoose');
const dotenv = require('dotenv');
const logger = require('../logs/winston');

dotenv.config();

const DB_URL = 'mongodb+srv://woomin:rkddnckd@cluster0-idrbb.mongodb.net/test?retryWrites=true&w=majority';

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  logger.info("MongoDB is connected ");
});

mongoose.connect(DB_URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).catch(err => logger.info(err));

module.exports = db;
