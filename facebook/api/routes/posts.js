const express = require('express');
const router = express.Router();
const postService = require('../service/postService');
const validate = require('../middleware/validate');
const { validatePost } = require('../models/post');

// GET 게시글 목록
router.get('/', async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.status(200).send({ timeLinePosts: posts });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error: Cannot get all posts' });
  }
});

// 게시글 등록
router.post('/', validate(validatePost), async (req, res) => {
  try {
    await postService.createPost(req.body);
    const posts = await postService.getAllPosts();
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
    await postService.removePost(uniquekey);
    const posts = await postService.getAllPosts();
    res.status(200).send({ timeLinePosts: posts });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 게시글 수정
router.patch('/', async (req, res) => {
  const { uniqueKey, updatedContents } = req.body;

  try {
    await postService.editPost(uniqueKey, updatedContents, res);
    const posts = await postService.getAllPosts();
    res.send({ timeLinePosts: posts });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
