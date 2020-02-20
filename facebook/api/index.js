const express = require('express');
const cors = require('cors');

const {
  getUsers,
  addUser,
} = require('./login');

const {
  getPosts,
  addPost,
} = require('./posts');

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

app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});
