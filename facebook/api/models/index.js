const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("* Connecting the mongoDB at port 27017...");
});

mongoose.connect(process.env.DB_PRODUCT, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

module.exports = db;
