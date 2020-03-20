const express = require('express');
const router = express.Router();

const User = require('../models/user');

// 친구 추가
router.post('/', async (req, res) => {
  const { currentUserID, friendID } = req.body;

  try {
    await User.updateOne(
      { id: currentUserID },
      { $addToSet: { friends: friendID } }
    );

    const users = await User.find();
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
    await User.updateOne(
      { id: currentUserID },
      { $pull : { friends: friendID } }
    );

    const users = await User.find();
    res.send({ userStore: users });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
