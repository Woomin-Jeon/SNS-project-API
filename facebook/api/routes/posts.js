const express = require('express');
const router = express.Router();
const PostRepo = require('../repository/post.repository');

// GET 게시글 목록
router.get('/', async (req, res) => {
  try {
    const posts = await PostRepo.getAllPosts();
    res.send({ timeLinePosts: posts });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 게시글 등록
router.post('/', async (req, res) => {
  const { id, name, contents, profile, imagePath, time } = req.body;

  try {
    await PostRepo.createPost(id, name, contents, profile, imagePath, time);
    const posts = await PostRepo.getAllPosts();
    res.status(200).send({ timeLinePosts: posts });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 게시글 삭제
router.delete('/:uniquekey', async (req, res) => {
  const uniquekey = req.params.uniquekey;

  try {
    await PostRepo.removePost(uniquekey);
    const posts = await PostRepo.getAllPosts();
    res.send({ timeLinePosts: posts });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 게시글 수정
router.patch('/', async (req, res) => {
  const { uniqueKey, updatedContents } = req.body;

  try {
    await PostRepo.editPost(uniqueKey, updatedContents);
    const posts = await PostRepo.getAllPosts();
    res.send({ timeLinePosts: posts });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
