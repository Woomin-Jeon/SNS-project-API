const mongoose = require('mongoose');
const logger = require('../logs/winston');

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  logger.info("mongoDB is connected");
});

mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
}).catch(err => logger.info(err));

module.exports = db;
