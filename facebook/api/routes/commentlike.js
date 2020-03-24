const express = require('express');
const router = express.Router();
const CommentRepo = require('../repository/comment.repository');

// 댓글 좋아요 +1
router.patch('/', async (req, res) => {
  const { uniqueKey, currentUserID } = req.body;

  try {
    await CommentRepo.like(uniqueKey, currentUserID);
    const comments = await CommentRepo.getAllComments();
    res.send({ postComments: comments });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
