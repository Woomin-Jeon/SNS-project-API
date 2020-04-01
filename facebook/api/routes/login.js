const express = require('express');
const router = express.Router();
const userService = require('../service/userService');
const vaildate = require('../middleware/validate');
const { validateUser } = require('../models/user');

// GET 유저 목록
router.get('/', async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.send({ userStore: users });
  } catch(err) {
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

// 회원가입
router.post('/', vaildate.checker(validateUser), async (req, res) => {
  try {
    await userService.signUp(req.body);
    res.status(200).send();
  } catch (err){
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;

