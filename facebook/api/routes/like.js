const express = require('express');
const router = express.Router();
const postService = require('../service/postService');

// 게시글 좋아요 +1
router.patch('/', async (req, res) => {
  const { uniqueKey, currentUserID } = req.body;

  try {
    await postService.like(uniqueKey, currentUserID);
    const posts = await postService.getAllPosts();
    res.status(200).send({ timeLinePosts: posts });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
