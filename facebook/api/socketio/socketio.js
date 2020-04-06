const app = require('../index');
const server = require('http').createServer(app);
const io = require('socket.io')(server);

const socketPort = 4000;
const port = 3000;

io.on('connection', (socket) => {
  socket.on('chat message', function(msg){
    const { message, userSocketID, userID } = msg;

    io.to(userSocketID).emit('hello', { userID, message });
  });
});

if (process.env.NODE_ENV !== 'test') {
  server.listen(socketPort, () => {
    console.log(`* socket.io is connected at port ${port}...`);
  });
}
module.exports = io;
