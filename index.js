const app = require('./app');
const logger = require('./logs/winston');
require('./models/index');
require('./socketio/index');

const port = process.env.PORT || 3000;

app.listen(process.env.PORT, () => {
  logger.info(`server is running on port ${port}...`);
});
