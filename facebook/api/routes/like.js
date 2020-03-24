const express = require('express');
const router = express.Router();
const PostRepo = require('../repository/post.repository');

// 게시글 좋아요 +1
router.patch('/', async (req, res) => {
  const { uniqueKey, currentUserID } = req.body;

  try {
    await PostRepo.like(uniqueKey, currentUserID);
    const posts = await PostRepo.getAllPosts();
    res.send({ timeLinePosts: posts });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
