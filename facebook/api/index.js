const express = require('express');
const server = require('http').createServer(express);
const io = require('socket.io')(server);
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3000;
const socketPort = 4000;

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("* Connected to mongoDB at port 27017...");
});

mongoose.connect('mongodb://localhost:27017/facebook', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.use(express.json());
app.use(cors({ origin: 'http://localhost:8080', credentials: true }));
app.use(fileUpload());
app.use(session({
  secret : 'JEONWOOMINFACEBOOKSESSION',
  resave: true,
  saveUninitialized: false,
  cookie: {},
}));

// socket.io 연결
io.on('connection', (socket) => {
  socket.on('chat message', function(msg){
    const { message, userSocketID, userID } = msg;

    io.to(userSocketID).emit('hello', { userID, message });
  });

  socket.on('disconnect', function(){
  });
});

app.use('/socket', require('./routes/socket'));
app.use('/profile', require('./routes/profile'));
app.use('/upload', require('./routes/upload'));
app.use('/session', require('./routes/session'));
app.use('/login', require('./routes/login'));
app.use('/friends', require('./routes/friends'));
app.use('/posts', require('./routes/posts'));
app.use('/scraps', require('./routes/scraps'));
app.use('/comments', require('./routes/comments'));
app.use('/childcomments', require('./routes/childcomments'));
app.use('/like', require('./routes/like'));
app.use('/commentlike', require('./routes/commentlike'));

app.listen(port, () => {
  console.log(`* Server is running at port ${port}...`);
});

server.listen(socketPort, () => {
  console.log(`* socket.io is connected at port ${port}...`);
});
