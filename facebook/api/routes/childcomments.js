const express = require('express');
const router = express.Router();
const CommentService = require('../service/comment.service');

// 대댓글 추가
router.post('/', async (req, res) => {
  const { uniqueKey, contents, currentUserID, currentUserName } = req.body;

  try {
    await CommentService.addChildComment(uniqueKey, contents, currentUserID, currentUserName);
    const comments = await CommentService.getAllComments();
    res.send({ postComments: comments });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
