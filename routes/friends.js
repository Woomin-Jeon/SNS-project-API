const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const wrapAsync = require('../middleware/wrapAsync');

// 친구 추가
router.post('/', wrapAsync(async (req, res) => {
  const { currentUserID, friendID } = req.body;

  await userService.addFriend(currentUserID, friendID);
  const users = await userService.getAllUsers();

  res.send({ userStore: users });
}));

// 친구 해제
router.patch('/', wrapAsync(async (req, res) => {
  const { currentUserID, friendID } = req.body;

  await userService.removeFriend(currentUserID, friendID);
  const users = await userService.getAllUsers();

  res.send({ userStore: users });
}));

module.exports = router;
