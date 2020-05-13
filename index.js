const app = require('./app');
const logger = require('./logs/winston');
require('./models/index');
require('./socketio/index');

const port = process.env.PORT || 7070;

app.listen(port, () => {
  logger.info(`server is running on port ${port}...`);
});
