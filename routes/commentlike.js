const express = require('express');
const router = express.Router();
const commentService = require('../service/commentService');
const wrapAsync = require('../middleware/wrapAsync');

// 댓글 좋아요 +1
router.patch('/', wrapAsync(async (req, res) => {
  const { uniqueKey, currentUserID } = req.body;

  await commentService.like(uniqueKey, currentUserID);
  const comments = await commentService.getAllComments();

  res.send({ postComments: comments });
}));

module.exports = router;
