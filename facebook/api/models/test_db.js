const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("* Connecting the Test MongoDB...");
});

mongoose.connect(process.env.DB_TEST, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = db;
