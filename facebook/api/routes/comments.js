const express = require('express');
const router = express.Router();
const commentService = require('../service/commentService');
const postService = require('../service/postService');
const wrapAsync = require('../middleware/wrapAsync');

// GET 댓글 목록
router.get('/', wrapAsync(async (req, res) => {
  const comments = await commentService.getAllComments();

  res.status(200).send({ postComments: comments });
}));

// 댓글 추가
router.post('/', wrapAsync(async (req, res) => {
  const { uniqueKey, currentUserID, currentUserName, commentContents } = req.body;

  await commentService.createComment(uniqueKey, currentUserID, currentUserName, commentContents);
  const comments = await commentService.getAllComments();

  res.status(200).send({ postComments: comments});
}));

// 댓글 개수 +1
router.patch('/', wrapAsync(async (req, res) => {
  const { uniqueKey } = req.body;

  await postService.plusCommentCount(uniqueKey);
  const posts = await postService.getAllPosts();

  res.send({ timeLinePosts: posts });
}));

module.exports = router;
