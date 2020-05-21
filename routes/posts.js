const express = require('express');
const router = express.Router();
const postService = require('../service/postService');
const validate = require('../middleware/validate');
const { validatePost } = require('../models/post');
const wrapAsync = require('../middleware/wrapAsync');

// GET 게시글 목록
router.get('/', wrapAsync(async (req, res) => {
  const posts = await postService.getAllPosts();

  res.status(200).send({ timeLinePosts: posts });
}));

// 게시글 등록
router.post('/', validate(validatePost), wrapAsync(async (req, res) => {
  await postService.createPost(req.body);
  const posts = await postService.getAllPosts();

  res.status(200).send({ timeLinePosts: posts });
}));

// 게시글 삭제
router.delete('/:uniquekey', wrapAsync(async (req, res) => {
  const uniquekey = req.params.uniquekey;

  await postService.removePost(uniquekey);
  const posts = await postService.getAllPosts();

  res
    .header('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE')
    .status(200).send({ timeLinePosts: posts });
}));

// 게시글 수정
router.patch('/', wrapAsync(async (req, res) => {
  const { uniqueKey, updatedContents } = req.body;

  await postService.editPost(uniqueKey, updatedContents, res);
  const posts = await postService.getAllPosts();

  res.send({ timeLinePosts: posts });
}));

module.exports = router;
