const express = require('express');
const router = express.Router();
const CommentService = require('../service/comment.service');
const PostService = require('../service/post.service');

// GET 댓글 목록
router.get('/', async (req, res) => {
  const comments = await CommentService.getAllComments();
  res.send({ postComments: comments });
});

// 댓글 추가
router.post('/', async (req, res) => {
  const { uniqueKey, currentUserID, currentUserName, commentContents } = req.body;

  try {
    await CommentService.createComment(uniqueKey, currentUserID, currentUserName, commentContents);
    const comments = await CommentService.getAllComments();
    res.status(200).send({ postComments: comments});
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 댓글 개수 +1
router.patch('/', async (req, res) => {
  const { uniqueKey } = req.body;

  await PostService.plusCommentCount(uniqueKey);
  const posts = await PostService.getAllPosts();
  res.send({ timeLinePosts: posts });
});

module.exports = router;
