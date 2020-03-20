const express = require('express');
const router = express.Router();

const User = require('../models/user');

// GET 유저 목록
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
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
    await User.create({
      id,
      pw,
      userName,
      birth,
      location,
      email,
      friends: [],
      profile,
    });
    res.status(200).send();
  } catch (err){
    console.error(err);
    res.status(500).send({ message: 'Server error' });
  }
});

module.exports = router;

