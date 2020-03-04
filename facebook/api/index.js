const express = require('express');
const session = require('express-session');
const cors = require('cors');

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

const port = 3000;
const app = express();

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
    res.status(400);
    return;
  }
  
  const user = getUserByID(req.session.userID);
  res.send({ user });
});

// 로그인 시 세션 저장
app.post('/session', (req, res) => {
  const { userID, userPW } = req.body;

  const user = login(userID, userPW);

  if (user === 400) {
    res.send({ status: 400 });
  } else {
    req.session.userID = userID;
    res.send({ user });
  }
});

// 세션 제거
app.patch('/session', (req, res) => {
  req.session.destroy();
  res.send();
});

app.get('/login', (req, res) => {
  const userStore = getUsers();
  res.send({ userStore });
});

app.post('/login', (req, res) => {
  const { id, pw, userName } = req.body;
  const userStore = addUser(id, pw, userName);
  res.send({ userStore });
});

app.post('/friends', (req, res) => {
  const { currentUserID, friendID } = req.body;
  const userStore = addFriend(currentUserID, friendID);
  res.send({ userStore });
});

app.patch('/friends', (req, res) => {
  const { currentUserID, friendID } = req.body;
  const userStore = removeFriend(currentUserID, friendID);
  res.send({ userStore });
});

app.get('/posts', (req, res) => {
  const timeLinePosts = getPosts();
  res.send({ timeLinePosts });
});

app.post('/posts', (req, res) => {
  const { id, name, contents } = req.body;
  const timeLinePosts = addPost(id, name, contents);
  res.send({ timeLinePosts });
});

app.delete('/posts/:uniquekey', (req, res) => {
  const specificPostUniqueKey = req.params.uniquekey;
  const timeLinePosts = removePost(specificPostUniqueKey);
  res.send({ timeLinePosts });
});

app.patch('/posts', (req, res) => {
  const { uniqueKey, updatedContents } = req.body;
  const timeLinePosts = editPost(uniqueKey, updatedContents);
  res.send({ timeLinePosts });
});

app.post('/scraps', (req, res) => {
  const { whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey } = req.body;
  const timeLinePosts = addScrap(whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey);
  res.send({ timeLinePosts });
});

app.get('/comments', (req, res) => {
  const postComments = getComments();
  res.send({ postComments });
})

app.post('/comments', (req, res) => {
  const { uniqueKey, currentUserID, currentUserName, commentContents } = req.body;
  const postComments = addComment(uniqueKey, currentUserID, currentUserName, commentContents);
  res.send({ postComments });
});

app.patch('/comments', (req, res) => {
  const { uniqueKey } = req.body;
  const timeLinePosts = plusCommentCount(uniqueKey);
  res.send({ timeLinePosts });
});

app.post('/childcomments', (req, res) => {
  const { uniqueKey, contents, currentUserID, currentUserName } = req.body;
  const postComments = addChildComment(uniqueKey, contents, currentUserID, currentUserName);
  res.send({ postComments });
})

app.patch('/like', (req, res) => {
  const { uniqueKey, currentUserID } = req.body;
  const timeLinePosts = plusThumbCount(uniqueKey, currentUserID);
  res.send({ timeLinePosts });
});

app.patch('/commentlike', (req, res) => {
  const { uniqueKey, currentUserID } = req.body;
  const postComments = plusCommentThumbCount(uniqueKey, currentUserID);
  res.send({ postComments });
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});
