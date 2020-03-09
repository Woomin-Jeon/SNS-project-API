const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const mongoose = require('mongoose');

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
const Key = require('./models/key');

app.use(express.json());
app.use(cors());
app.use(fileUpload());
app.use(session({
  secret : 'JEONWOOMINISGOOD',
  resave: true,
  saveUninitialized: false,
  cookie: {},
}));

// 프로필 사진 업로드
app.patch('/profile', async (req, res) => {
  const { userId, filePath } = req.body;

  await User.updateOne(
    { id: userId },
    { $set: { profile: filePath } },
  );

  res.status(200).send();
});

// 파일 업로드
app.post('/upload', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;
  await Key.updateOne(
    { id: 'key' },
    { $inc: { key: +1 } },
  );

  const getKey = await Key.findOne({ id: 'key' });

  file.mv(`${__dirname}/../FrontEnd/img/${getKey.id}${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(400).send(err);
    }

    res.json({ fileName: file.name, filePath: `/img/${getKey.id}${file.name}` });
  });
});

// 로그인화면에서 이미 세션이 존재하는가
app.get('/session', async (req, res) => {
  if (!req.session.userID) {
    res.status(400).send({ message: 'Session not exist' });
    return;
  }

  try {
    const user = await User.findById(req.session.userID);
    res.send({ user });
  } catch(err) {
    console.error(err);
    res.status(500).send({message: 'Server error'});
  }
});

// 로그인 시 세션 저장
app.post('/session', async (req, res) => {
  const { userID, userPW } = req.body;

  try {
    const user = await User.findOne({ id: userID, pw: userPW });

    if (!user) {
      res.send({ status: 400, user: null });
      return;
    }

    req.session.userID = user._id;
    res.send({ user });
  } catch(err) {
    console.error(err);
    res.status(500).send({message: 'Server error'});
  }
});

// 세션 제거
app.patch('/session', (req, res) => {
  req.session.destroy();
  res.send();
});

// GET 유저 목록
app.get('/login', async (req, res) => {
  try {
    const users = await User.find();
    res.send({ userStore: users });
  } catch(err) {
    console.error(err);
    res.status(500).send({message: 'Server error'});
  }
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
      profile: '',
    });
    res.status(200).send();
  } catch (err){
    console.error(err);
    res.status(500).send({message: 'Server error'});
  }
});

// 친구 추가
app.post('/friends', async (req, res) => {
  const { currentUserID, friendID } = req.body;

  try {
    await User.updateOne(
      { id: currentUserID },
      { $addToSet: { friends: friendID } }
    );

    const users = await User.find();
    res.send({ userStore: users });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 친구 해제
app.patch('/friends', async (req, res) => {
  const { currentUserID, friendID } = req.body;

  try {
    await User.updateOne(
      { id: currentUserID },
      { $pull : { friends: friendID } }
    );

    const users = await User.find();
    res.send({ userStore: users });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// GET 게시글 목록
app.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send({ timeLinePosts: posts });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 게시글 등록
app.post('/posts', async (req, res) => {
  const { id, name, contents, profile } = req.body;

  try {
    await Key.updateOne(
      { id: 'key' },
      { $inc: { key: +1 } },
    );

    const getKey = await Key.findOne({ id: 'key' });

    await Post.create({
      uniqueKey: getKey.key,
      id,
      name,
      profile,
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
    res.status(500).send({ message: 'Server error' });
  }
});

// 게시글 삭제
app.delete('/posts/:uniquekey', async (req, res) => {
  const specificPostUniqueKey = req.params.uniquekey;

  try {
    const post = await Post.deleteOne({ uniqueKey: specificPostUniqueKey});
    const posts = await Post.find();
    res.send({ timeLinePosts: posts });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 게시글 수정
app.patch('/posts', async (req, res) => {
  const { uniqueKey, updatedContents } = req.body;

  try {
    await Post.updateOne(
      { uniqueKey: uniqueKey },
      { $set : { contents: updatedContents } },
    );

    const posts = await Post.find();
    res.send({ timeLinePosts: posts });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 게시글 스크랩
app.post('/scraps', async (req, res) => {
  const { whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey, profile } = req.body;

  try {
    await Key.updateOne(
      { id: 'key' },
      { $inc: { key: +1 } },
    );

    const getKey = await Key.findOne({ id: 'key' });

    await Scrap.create({
      uniqueKey: getKey.key,
      id: whoScrapedByID,
      whoDid: whoScrapedByName,
      name: whoWritePostByName,
      profile,
      contents: ScrapedPostContents,
    });
    const scraps = await Scrap.find();
    res.status(200).send({ timeLinePosts: scraps});
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
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
    await Key.updateOne(
      { id: 'key' },
      { $inc: { key: +1 } },
    );

    const getKey = await Key.findOne({ id: 'key' });

    await Comment.create({
      uniqueKey: getKey.key,
      id: uniqueKey,
      writerID: currentUserID,
      writer: currentUserName,
      statement: commentContents,
      childComment: [],
      isChildCommentFunctionOn: false,
      commentThumbCount: [],
    });

    const comments = await Comment.find();
    res.status(200).send({ postComments: comments});
  } catch (err) {
    console.error(err);
    res.status(500).send({message: 'Server error'});
  }
});

// 댓글 개수 +1
app.patch('/comments', async (req, res) => {
  const { uniqueKey } = req.body;
  await Post.updateOne(
    { uniqueKey: uniqueKey },
    { $inc: { commentCount: +1 } },
  );

  const posts = await Post.find();
  res.send({ timeLinePosts: posts });
});

// 대댓글 추가
app.post('/childcomments', async (req, res) => {
  const { uniqueKey, contents, currentUserID, currentUserName } = req.body;

  try {
    await Comment.updateOne(
      { uniqueKey: uniqueKey },
      { $push: {
          childComment: {
            id: currentUserID,
            name: currentUserName,
            statement: contents
          }
        }
      });
  } catch(err) {
    console.error(err);
    res.status(500).send({message: 'Server error'});
  }

  const comments = await Comment.find();
  res.send({ postComments: comments });
});

// 게시글 좋아요 +1
app.patch('/like', async (req, res) => {
  const { uniqueKey, currentUserID } = req.body;

  try {
    await Post.updateOne(
      { uniqueKey: uniqueKey },
      { $addToSet: { thumbCount: currentUserID } }
    );

    const posts = await Post.find();
    res.send({ timeLinePosts: posts });
  } catch(err) {
    console.error(err);
    res.status(500).send({message: 'Server error'});
  }
});

// 댓글 좋아요 +1
app.patch('/commentlike', async (req, res) => {
  const { uniqueKey, currentUserID } = req.body;

  try {
    await Comment.updateOne(
      { uniqueKey: uniqueKey },
      { $addToSet: { commentThumbCount: currentUserID } }
    );

    const comments = await Comment.find();
    res.send({ postComments: comments });
  } catch(err) {
    console.error(err);
    res.status(500).send({message: 'Server error'});
  }


});

app.listen(port, () => {
  console.log(`* Server is running at port ${port}...`);
});
