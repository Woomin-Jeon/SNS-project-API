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

let uniqueKeyCount = 0;

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
const Post = require('./models/post');
const Comment = require('./models/comment');
const Scrap = require('./models/scrap');

app.use(express.json());
app.use(cors());

app.use(session({
  secret : 'JEONWOOMINISGOOD',
  resave: true,
  saveUninitialized: false,
  cookie: {},
}));


// 로그인화면에서 이미 세션이 존재하는가
app.get('/session', async (req, res) => {
  if (!req.session.userID) {
    res.status(400).send({ message: 'Session not exist' });
    return;
  }

  const user = await User.findById(req.session.userID);
  res.send({ user });
});

// 로그인 시 세션 저장
app.post('/session', async (req, res) => {
  const { userID, userPW } = req.body;

  const user = await User.findOne({ id: userID, pw: userPW });

  if (!user) {
    res.send({ status: 400, user: null });
    return;
  }

  req.session.userID = user._id;
  res.send({ user });
});

// 세션 제거
app.patch('/session', (req, res) => {
  req.session.destroy();
  res.send();
});

// GET 유저 목록
app.get('/login', async (req, res) => {
  // const userStore = getUsers();
  // console.log(userStore);
  const users = await User.find();

  res.send({ userStore: users });
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
app.get('/posts', async (req, res) => {
  const posts = await Post.find();
  res.send({ timeLinePosts: posts });
});

// 게시글 등록
app.post('/posts', async (req, res) => {
  const { id, name, contents } = req.body;

  try {
    await Post.create({
      uniqueKey: uniqueKeyCount++,
      id,
      name,
      contents,
      thumbCount: [],
      sharingCount: 0,
      commentCount: 0,
      isEditButtonClicked: false,
    });
    const posts = await Post.find();
    res.status(200).send({ timeLinePosts: posts });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal error' });
  }
});

// 게시글 삭제
app.delete('/posts/:uniquekey', async (req, res) => {
  const specificPostUniqueKey = req.params.uniquekey;
  const post = await Post.deleteOne({ uniqueKey: specificPostUniqueKey});

  const posts = await Post.find();
  res.send({ timeLinePosts: posts });
});

// 게시글 수정
app.patch('/posts', async (req, res) => {
  const { uniqueKey, updatedContents } = req.body;

  const timeLinePosts = await Post.updateOne({
    uniqueKey: uniqueKey,
    $set : { contents: updatedContents },
  });

  const posts = await Post.find();
  res.send({ timeLinePosts: posts });
});

// 게시글 스크랩
app.post('/scraps', async (req, res) => {
  const { whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey } = req.body;

  try {
    await Scrap.create({
      uniqueKey: uniqueKeyCount++,
      id: whoScrapedByID,
      whoDid: whoScrapedByName,
      name: whoWritePostByName,
      contents: ScrapedPostContents,
    });
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Internal error' });
  }
  // const timeLinePosts = addScrap(whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey);
  // res.send({ timeLinePosts });
});

// GET 댓글 목록
app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.send({ postComments: comments });
});

// 댓글 추가
app.post('/comments', async (req, res) => {
  const { uniqueKey, currentUserID, currentUserName, commentContents } = req.body;

  try {
    await Comment.create({
      uniqueKey: uniqueKeyCount++,
      id: uniqueKey,
      writerID: currentUserID,
      writer: currentUserName,
      statement: commentContents,
      childComment: [],
      isChildCommentFunctionOn: false,
      commentThumbCount: [],
    });
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({message: 'Internal error'});
  }
  // const postComments = addComment(uniqueKey, currentUserID, currentUserName, commentContents);
  // res.send({ postComments });
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
});

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
