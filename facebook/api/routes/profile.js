const express = require('express');
const router = express.Router();
const userRepo = require('../repository/user.repository');

// 프로필 사진 업로드
router.patch('/', async (req, res) => {
  try {
    await userRepo.uploadProfileImage(req);
    res.status(200).send();
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Cannot upload profile image' });
  }
});

module.exports = router;
