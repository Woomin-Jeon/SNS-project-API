const express = require('express');
const router = express.Router();
const SocketRepo = require('../repository/socket.repository');

// GET socket.id
router.get('/:userid', (req, res) => {
  const userID = req.params.userid;
  const userSocketID = SocketRepo.findByUserID(userID);

  if (userSocketID === null) {
    res.send("400");
    return;
  }

  res.send({ userSocketID });
});

module.exports = router;
