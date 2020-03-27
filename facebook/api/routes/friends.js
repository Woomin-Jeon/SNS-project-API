const express = require('express');
const router = express.Router();
const userService = require('../service/userService');

// 친구 추가
router.post('/', async (req, res) => {
  const { currentUserID, friendID } = req.body;

  try {
    await userService.addFriend(currentUserID, friendID);
    const users = await userService.getAllUsers();
    res.send({ userStore: users });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 친구 해제
router.patch('/', async (req, res) => {
  const { currentUserID, friendID } = req.body;

  try {
    await userService.removeFriend(currentUserID, friendID);
    const users = await userService.getAllUsers();
    res.send({ userStore: users });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
