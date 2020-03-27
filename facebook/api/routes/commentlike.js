const express = require('express');
const router = express.Router();
const commentService = require('../service/commentService');

// 댓글 좋아요 +1
router.patch('/', async (req, res) => {
  const { uniqueKey, currentUserID } = req.body;

  try {
    await commentService.like(uniqueKey, currentUserID);
    const comments = await commentService.getAllComments();
    res.send({ postComments: comments });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
