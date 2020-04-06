const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const vaildate = require('../middleware/validate');
const { validateUser } = require('../models/user');
const wrapAsync = require('../middleware/wrapAsync');

// GET 유저 목록
router.get('/', wrapAsync(async (req, res) => {
  const users = await userService.getAllUsers();

  res.send({ userStore: users });
}));

// 회원가입
router.post('/', vaildate(validateUser), wrapAsync(async (req, res) => {
  await userService.signUp(req.body);

  res.status(200).send();
}));

module.exports = router;

