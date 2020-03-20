const express = require('express');
const router = express.Router();

const Comment = require('../models/comment');

// 대댓글 추가
router.post('/', async (req, res) => {
  const { uniqueKey, contents, currentUserID, currentUserName } = req.body;

  try {
    await Comment.updateOne(
      { uniqueKey: uniqueKey },
      { $push: {
          childComment: {
            id: currentUserID,
            name: currentUserName,
            statement: contents
          }
        }
      });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }

  const comments = await Comment.find();
  res.send({ postComments: comments });
});

module.exports = router;
