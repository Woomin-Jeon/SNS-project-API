const express = require('express');
const router = express.Router();

const socketIdStore = require('../store/socket');
const User = require('../models/user');

// 로그인화면에서 이미 세션이 존재하는가
router.get('/', async (req, res) => {
  if (!req.session.userID) {
    res.status(400).send({ message: 'Session not exist' });
    return;
  }

  try {
    const user = await User.findById(req.session.userID);
    res.send({ user });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 로그인 (세션 및 socket.id 저장)
router.post('/', async (req, res) => {
  const { userID, userPW, socketID } = req.body;

  socketIdStore.push({ id: userID, socket: socketID });

  try {
    const user = await User.findOne({ id: userID, pw: userPW });
    if (!user) {
      res.send({ status: 400, user: null });
      return;
    }

    await User.updateOne(
      { id: userID },
      { $set: { online: true } }
    );

    req.session.userID = user._id;
    res.send({ user });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 로그아웃 (세션 제거)
router.patch('/', async (req, res) => {
  const { userID } = req.body;

  const index = socketIdStore.findIndex(({id}) => id === userID);
  socketIdStore.splice(index, 1);

  try {
    await User.updateOne(
      { id: userID },
      { $set: { online: false } }
    );
  } catch (err) {
    console.error(err);
  }


  req.session.destroy();
  res.send();
});

module.exports = router;
