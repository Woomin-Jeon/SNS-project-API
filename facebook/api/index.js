const express = require('express');
const cors = require('cors');

const {
  getUsers,
  addUser,
} = require('./login');

const {
  getPosts,
  addPost,
  removePost,
  editPost,
  addScrap,
} = require('./timeline');

const port = 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/login', (req, res) => {
  const userStore = getUsers();
  res.send({ userStore });
});

app.post('/login', (req, res) => {
  const { id, pw, userName } = req.body;
  const userStore = addUser(id, pw, userName);
  res.send({ userStore });
});

app.get('/posts', (req, res) => {
  const timeLinePosts = getPosts();
  res.send({ timeLinePosts });
})

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
  const { uniqueKey, temptState } = req.body;
  const timeLinePosts = editPost(uniqueKey, temptState);
  res.send({ timeLinePosts });
});

app.post('/scraps', (req, res) => {
  const { whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey } = req.body;
  const timeLinePosts = addScrap(whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey);
  res.send({ timeLinePosts });
})

app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});
