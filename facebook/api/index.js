const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');

const {
  getUsers,
  addUser,
  addFriend,
  removeFriend,
  login,
  getUserByID,
} = require('./login');

const {
  getPosts,
  addPost,
  removePost,
  editPost,
  plusThumbCount,
  addScrap,
  getComments,
  addComment,
  plusCommentCount,
  plusCommentThumbCount,
  addChildComment,
} = require('./timeline');

const app = express();
const port = 3000;

const db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
  console.log("* Connected to mongoDB at port 27017...");
});

mongoose.connect('mongodb://localhost:27017/facebook', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

const User = require('./models/user');

app.use(express.json());
app.use(cors());

app.use(session({
  secret : 'JEONWOOMINISGOOD',
  resave: true,
  saveUninitialized: false,
  cookie: {},
}));

// 로그인화면에서 이미 세션이 존재하는가
app.get('/session', (req, res) => {
  if (!req.session.userID) {
    res.status(400).send({ message: 'Session not exist' });
    return;
  }

  const user = getUserByID(req.session.userID);
  res.send({ user });
});

// 로그인 시 세션 저장
app.post('/session', (req, res) => {
  const { userID, userPW } = req.body;

  const user = login(userID, userPW);
  if (!user) {
    res.send({ status: 400 });
    return;
  }

  req.session.userID = user.id;
  res.send({ user });
});

// 세션 제거
app.patch('/session', (req, res) => {
  req.session.destroy();
  res.send();
});

// GET 유저 목록
app.get('/login', (req, res) => {
  const userStore = getUsers();
  res.send({ userStore });
});

// 회원가입
app.post('/login', async (req, res) => {
  const { id, pw, userName } = req.body;

  try {
    await User.create({
      id,
      pw,
      userName,
      friends: [],
    });
    res.status(200).send();
  } catch (err){
    console.error(err);
    res.status(500).send({message: 'Internal error'});
  }
});

// 친구 추가
app.post('/friends', (req, res) => {
  const { currentUserID, friendID } = req.body;
  const userStore = addFriend(currentUserID, friendID);
  res.send({ userStore });
});

// 친구 해제
app.patch('/friends', (req, res) => {
  const { currentUserID, friendID } = req.body;
  const userStore = removeFriend(currentUserID, friendID);
  res.send({ userStore });
});

// GET 게시글 목록
app.get('/posts', (req, res) => {
  const timeLinePosts = getPosts();
  res.send({ timeLinePosts });
});

// 게시글 등록
app.post('/posts', (req, res) => {
  const { id, name, contents } = req.body;
  const timeLinePosts = addPost(id, name, contents);
  res.send({ timeLinePosts });
});

// 게시글 삭제
app.delete('/posts/:uniquekey', (req, res) => {
  const specificPostUniqueKey = req.params.uniquekey;
  const timeLinePosts = removePost(specificPostUniqueKey);
  res.send({ timeLinePosts });
});

// 게시글 수정
app.patch('/posts', (req, res) => {
  const { uniqueKey, updatedContents } = req.body;
  const timeLinePosts = editPost(uniqueKey, updatedContents);
  res.send({ timeLinePosts });
});

// 게시글 스크랩
app.post('/scraps', (req, res) => {
  const { whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey } = req.body;
  const timeLinePosts = addScrap(whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey);
  res.send({ timeLinePosts });
});

// GET 댓글 목록
app.get('/comments', (req, res) => {
  const postComments = getComments();
  res.send({ postComments });
})

// 댓글 추가
app.post('/comments', (req, res) => {
  const { uniqueKey, currentUserID, currentUserName, commentContents } = req.body;
  const postComments = addComment(uniqueKey, currentUserID, currentUserName, commentContents);
  res.send({ postComments });
});

// 댓글 개수 +1
app.patch('/comments', (req, res) => {
  const { uniqueKey } = req.body;
  const timeLinePosts = plusCommentCount(uniqueKey);
  res.send({ timeLinePosts });
});

// 대댓글 추가
app.post('/childcomments', (req, res) => {
  const { uniqueKey, contents, currentUserID, currentUserName } = req.body;
  const postComments = addChildComment(uniqueKey, contents, currentUserID, currentUserName);
  res.send({ postComments });
})

// 댓글 좋아요 +1
app.patch('/like', (req, res) => {
  const { uniqueKey, currentUserID } = req.body;
  const timeLinePosts = plusThumbCount(uniqueKey, currentUserID);
  res.send({ timeLinePosts });
});

// 대댓글 좋아요 +1
app.patch('/commentlike', (req, res) => {
  const { uniqueKey, currentUserID } = req.body;
  const postComments = plusCommentThumbCount(uniqueKey, currentUserID);
  res.send({ postComments });
});

app.listen(port, () => {
  console.log(`* Server is running at port ${port}...`);
});
