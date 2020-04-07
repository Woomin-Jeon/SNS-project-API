const app = require('./app');
const logger = require('./logs/winston');
require('./models/index');
require('./socketio/index');

app.listen(process.env.PORT, () => {
  logger.info(`server is running on port ${process.env.PORT}...`);
});
