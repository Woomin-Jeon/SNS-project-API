const express = require('express');
const router = express.Router();
const commentService = require('../service/commentService');
const wrapAsync = require('../middleware/wrapAsync');

// 대댓글 추가
router.post('/', wrapAsync(async (req, res) => {
  const { uniqueKey, contents, currentUserID, currentUserName } = req.body;

  await commentService.addChildComment(uniqueKey, contents, currentUserID, currentUserName);

  const comments = await commentService.getAllComments();

  res.send({ postComments: comments });
}));

module.exports = router;
