const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const Key = require('../models/key');

// GET 게시글 목록
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.send({ timeLinePosts: posts });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 게시글 등록
router.post('/', async (req, res) => {
  const { id, name, contents, profile, imagePath, time } = req.body;

  try {
    await Key.updateOne(
      { id: 'key' },
      { $inc: { key: +1 } },
    );

    const key = await Key.findOne({ id: 'key' });

    await Post.create({
      uniqueKey: key.key,
      id,
      name,
      profile,
      contents,
      time,
      image: imagePath,
      thumbCount: [],
      sharingCount: 0,
      commentCount: 0,
      isEditButtonClicked: false,
    });
    const posts = await Post.find();
    res.status(200).send({ timeLinePosts: posts });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 게시글 삭제
router.delete('/:uniquekey', async (req, res) => {
  const specificPostUniqueKey = req.params.uniquekey;

  try {
    const post = await Post.deleteOne({ uniqueKey: specificPostUniqueKey});
    const posts = await Post.find();
    res.send({ timeLinePosts: posts });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 게시글 수정
router.patch('/', async (req, res) => {
  const { uniqueKey, updatedContents } = req.body;

  try {
    await Post.updateOne(
      { uniqueKey: uniqueKey },
      { $set : { contents: updatedContents } },
    );

    const posts = await Post.find();
    res.send({ timeLinePosts: posts });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
