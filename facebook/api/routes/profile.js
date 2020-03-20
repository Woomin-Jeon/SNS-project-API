const express = require('express');
const router = express.Router();

const User = require('../models/user');

// 프로필 사진 업로드
router.patch('/', async (req, res) => {
  const { userId, filePath } = req.body;

  await User.updateOne(
    { id: userId },
    { $set: { profile: filePath } },
  );

  res.status(200).send();
});

module.exports = router;
