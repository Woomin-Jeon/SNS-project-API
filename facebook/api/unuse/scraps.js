const express = require('express');
const router = express.Router();

const Scrap = require('../models/scrap');
const Key = require('../models/key');

// 게시글 스크랩
router.post('/', async (req, res) => {
  const { whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey, profile } = req.body;

  try {
    await Key.updateOne(
      { id: 'key' },
      { $inc: { key: +1 } },
    );

    const key = await Key.findOne({ id: 'key' });

    await Scrap.create({
      uniqueKey: key,
      id: whoScrapedByID,
      whoDid: whoScrapedByName,
      name: whoWritePostByName,
      profile,
      contents: ScrapedPostContents,
    });
    const scraps = await Scrap.find();
    res.status(200).send({ timeLinePosts: scraps});
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
