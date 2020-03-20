const express = require('express');
const router = express.Router();

const Key = require('../models/key');
const Comment = require('../models/comment');
const Post = require('../models/post');

// GET 댓글 목록
router.get('/', async (req, res) => {
  const comments = await Comment.find();
  res.send({ postComments: comments });
});

// 댓글 추가
router.post('/', async (req, res) => {
  const { uniqueKey, currentUserID, currentUserName, commentContents } = req.body;

  try {
    await Key.updateOne(
      { id: 'key' },
      { $inc: { key: +1 } },
    );

    const key = await Key.findOne({ id: 'key' });

    await Comment.create({
      uniqueKey: key.key,
      id: uniqueKey,
      writerID: currentUserID,
      writer: currentUserName,
      statement: commentContents,
      childComment: [],
      isChildCommentFunctionOn: false,
      commentThumbCount: [],
    });

    const comments = await Comment.find();
    res.status(200).send({ postComments: comments});
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 댓글 개수 +1
router.patch('/', async (req, res) => {
  const { uniqueKey } = req.body;
  await Post.updateOne(
    { uniqueKey: uniqueKey },
    { $inc: { commentCount: +1 } },
  );

  const posts = await Post.find();
  res.send({ timeLinePosts: posts });
});

module.exports = router;
