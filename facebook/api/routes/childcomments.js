const express = require('express');
const router = express.Router();
const CommentRepo = require('../repository/comment.repository');

// 대댓글 추가
router.post('/', async (req, res) => {
  const { uniqueKey, contents, currentUserID, currentUserName } = req.body;

  try {
    await CommentRepo.addChildComment(uniqueKey, contents, currentUserID, currentUserName);
    const comments = await CommentRepo.getAllComments();
    res.send({ postComments: comments });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
