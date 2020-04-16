const mongoose = require('mongoose');
const logger = require('../logs/winston');

const db = mongoose.connection;
db.on('error', logger.info('DB에 에러났음'));
db.once('open', function(){
  logger.info("mongoDB is connected");
});

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).catch(err => logger.info(err.stack));

module.exports = db;
