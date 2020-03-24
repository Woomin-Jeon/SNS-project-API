const express = require('express');
const router = express.Router();
const CommentRepo = require('../repository/comment.repository');
const PostRepo = require('../repository/post.repository');

// GET 댓글 목록
router.get('/', async (req, res) => {
  const comments = await CommentRepo.getAllComments();
  res.send({ postComments: comments });
});

// 댓글 추가
router.post('/', async (req, res) => {
  const { uniqueKey, currentUserID, currentUserName, commentContents } = req.body;

  try {
    await CommentRepo.createComment(uniqueKey, currentUserID, currentUserName, commentContents);
    const comments = await CommentRepo.getAllComments();
    res.status(200).send({ postComments: comments});
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 댓글 개수 +1
router.patch('/', async (req, res) => {
  const { uniqueKey } = req.body;

  await PostRepo.plusCommentCount(uniqueKey);
  const posts = await PostRepo.getAllPosts();
  res.send({ timeLinePosts: posts });
});

module.exports = router;
