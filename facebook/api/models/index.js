const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const selectDB = process.env.NODE_ENV === 'test'
  ? process.env.DB_TEST
  : process.env.DB_PRODUCT;

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("* Connecting the mongoDB at port 27017...");
});

mongoose.connect(selectDB, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = db;
