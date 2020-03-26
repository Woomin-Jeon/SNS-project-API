const express = require('express');
const router = express.Router();
const SocketFunc = require('../utils/socket');

// GET socket.id
router.get('/:userid', (req, res) => {
  const userID = req.params.userid;
  const userSocketID = SocketFunc.findByUserID(userID);

  if (userSocketID === null) {
    res.send("400");
    return;
  }

  res.send({ userSocketID });
});

module.exports = router;
