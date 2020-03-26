const express = require('express');
const router = express.Router();
const UserService = require('../service/user.service');

// 친구 추가
router.post('/', async (req, res) => {
  const { currentUserID, friendID } = req.body;

  try {
    await UserService.addFriend(currentUserID, friendID);
    const users = await UserService.getAllUsers();
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
    await UserService.removeFriend(currentUserID, friendID);
    const users = await UserService.getAllUsers();
    res.send({ userStore: users });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
