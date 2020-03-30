const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

// 프로필 사진 업로드
router.patch('/', async (req, res) => {
  try {
    const { userId, filePath } = req.body;

    await userService.uploadProfileImage(userId, filePath);
    const users = await userService.getAllUsers();
    res.status(200).send({ userStore: users });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: 'Cannot upload profile image' });
  }
});

module.exports = router;
