const express = require('express');
const router = express.Router();
const userService = require('../service/user.service');

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
router.post('/', async (req, res) => {
  const { id, pw, userName, birth, location, email, profile } = req.body;

  try {
    await userService.signUp(id, pw, userName, birth, location, email, profile);
    res.status(200).send();
  } catch (err){
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;

