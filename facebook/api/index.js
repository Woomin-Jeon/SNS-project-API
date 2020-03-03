const express = require('express');
const session = require('express-session');
const cors = require('cors');

const {
  getUsers,
  addUser,
  addFriend,
  removeFriend,
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

/* 클라이언트: req (cookie는 req에 자동을 포함되어서 전송)
   서버 : cookie 안에 sessionID가 있는지 확인
   존재함?   -> 서버에 저장해놓은 sessionID 값과 인덱싱해서 해당 ID에 맞는 서비스 제공
   존재안함? -> 서버가 sessionID 값을 생성하고 이를 클라이언트에게 발행

만약에 로그인 버튼을 누르면, currentUser의
값을 세션ID와 함께 서버 세션스토리지에 
저장하고 로그인 화면을 띄울 때
app.get('/login')에서 쿠키 안에 세션 ID가
존재하는지 확인하고 /post로 보낼지 말지
정한다.  
*/

// 클라이언트에 쿠키-세션 할당하기
app.use(session({
  secret : 'JEONWOOMINISGOOD',
  resave: true,
  saveUninitialized: true,
  cookie: {}, // 쿠키 할당
}));

app.get('/login', (req, res) => {
  const sess = req.session;
  sess.cookie = { ...sess.cookie, id: req.sessionID } // 쿠키에 세션ID 넣기
  console.log(`----------------------------------------------`)
  console.log('Session ID : ', req.sessionID);
  console.log('Cookie : ', req.session.cookie);
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
