const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const { socket } = require('../utils/socket');
const funcRepo = require('../utils/methods');
const validate = require('../middleware/validate');
const validateSession = require('../middleware/validateSession');

// 로그인화면에서 이미 세션이 존재하는가
router.get('/', validate(validateSession), async (req, res) => {
  try {
    const user = await userService.findBySession(req);

    res.status(200).send({ user });
  } catch (err) {
    console.error(err);

    res.status(500).send({ message: 'Cannot register session to server' });
  }
});

// 로그인 (세션 및 socket.id 저장)
router.post('/', async (req, res) => {
  const { userID, userPW, socketID } = req.body;

  try {
    const user = await userService.getUserById(userID);

    if (!funcRepo.checkPassword(user, userPW)) {
      res.status(400).send({ status: 400, user: null });
      return;
    }

    socket.registerSocket(userID, socketID);

    await userService.onlineStatus(userID, true);

    req.session.userID = user._id;
    res.send({ user });
  } catch(err) {
    console.error(err);

    res.status(500).send({ message: 'Server error' });
  }
});

// 로그아웃 (세션 및 socket.id 제거)
router.patch('/', async (req, res) => {
  const { userID } = req.body;

  try {
    socket.unregisterSocket(userID);
    await userService.onlineStatus(userID, false);
    req.session.destroy();

    res.status(200).send();
  } catch (err) {
    console.error(err);

    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;
