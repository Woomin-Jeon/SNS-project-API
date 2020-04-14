const app = require('../app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const logger = require('../logs/winston');

const port = process.env.SOCKET_PORT || 4000;

io.on('connection', (socket) => {
  socket.on('chat message', function(msg){
    const { message, userSocketID, userID } = msg;

    io.to(userSocketID).emit('hello', { userID, message });
  });
});

server.listen(port, () => {
  logger.info(`socket.io is connected on port ${port}...`);
});

module.exports = io;
