const app = require('../app');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
  socket.on('chat message', function(msg){
    const { message, userSocketID, userID } = msg;

    io.to(userSocketID).emit('hello', { userID, message });
  });
});

server.listen(process.env.SOCKET_PORT, () => {
  console.log(`* Connecting the socket.io at port ${process.env.SOCKET_PORT}...`);
});

module.exports = io;
