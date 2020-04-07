const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const { socket } = require('../socketio/socket');
const funcRepo = require('../utils/methods');
const validate = require('../middleware/validate');
const validateSession = require('../middleware/validateSession');
const wrapAsync = require('../middleware/wrapAsync');

// 로그인화면에서 이미 세션이 존재하는가
router.get('/', validate(validateSession), wrapAsync(async (req, res) => {
  const user = await userService.findBySession(req);

  res.status(200).send({ user });
}));

// 로그인 (세션 및 socket.id 저장)
router.post('/', wrapAsync(async (req, res) => {
  const { userID, userPW, socketID } = req.body;

  const user = await userService.getUserById(userID);

  if (!funcRepo.checkPassword(user, userPW)) {
    res.status(400).send({ status: 400, user: null });
    return;
  }

  socket.registerSocket(userID, socketID);

  await userService.onlineStatus(userID, true);

  req.session.userID = user._id;

  res.send({ user });
}));

// 로그아웃 (세션 및 socket.id 제거)
router.patch('/', wrapAsync(async (req, res) => {
  const { userID } = req.body;

  socket.unregisterSocket(userID);
  await userService.onlineStatus(userID, false);
  req.session.destroy();

  res.status(200).send();
}));

module.exports = router;
