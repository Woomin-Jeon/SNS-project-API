const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');

// 댓글 좋아요 +1
router.patch('/', async (req, res) => {
  const { uniqueKey, currentUserID } = req.body;

  try {
    await Comment.updateOne(
      { uniqueKey: uniqueKey },
      { $addToSet: { commentThumbCount: currentUserID } }
    );

    const comments = await Comment.find();
    res.send({ postComments: comments });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
