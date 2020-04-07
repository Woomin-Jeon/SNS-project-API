const express = require('express');
const router = express.Router();
const postService = require('../service/postService');
const wrapAsync = require('../middleware/wrapAsync');

// 게시글 좋아요 +1
router.patch('/', wrapAsync(async (req, res) => {
  const { uniqueKey, currentUserID } = req.body;

  await postService.like(uniqueKey, currentUserID);
  const posts = await postService.getAllPosts();

  res.status(200).send({ timeLinePosts: posts });
}));

module.exports = router;
