const express = require('express');
const router = express.Router();

const Post = require('../models/post');

// 게시글 좋아요 +1
router.patch('/', async (req, res) => {
  const { uniqueKey, currentUserID } = req.body;

  try {
    await Post.updateOne(
      { uniqueKey: uniqueKey },
      { $addToSet: { thumbCount: currentUserID } }
    );

    const posts = await Post.find();
    res.send({ timeLinePosts: posts });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
