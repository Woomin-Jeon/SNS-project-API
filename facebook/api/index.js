const app = require('./app');
const db = require('./models/index');
const io = require('./socketio/socketio');

const port = 3000;

db;
io;

if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`* Server is running at port ${port}...`);
  });
}
