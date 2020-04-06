const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const wrapAsync = require('../middleware/wrapAsync');

// 프로필 사진 업로드
router.patch('/', wrapAsync(async (req, res) => {
  const { userId, filePath } = req.body;

  await userService.uploadProfileImage(userId, filePath);
  const users = await userService.getAllUsers();

  res.status(200).send({ userStore: users });
}));

module.exports = router;
