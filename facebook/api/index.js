const app = require('./app');
require('./models/index');
require('./socketio/socketio');

app.listen(process.env.PORT, () => {
  console.log(`* Server is running at port ${process.env.PORT}...`);
});
