const express = require('express');
const router = express.Router();

const socketIdStore = require('../store/socket');

// GET socket.id
router.get('/:userid', (req, res) => {
  const userID = req.params.userid;
  const index = socketIdStore
    .findIndex(({id}) =>id === userID);

  if (index === -1) {
    res.send("400");
    return;
  }

  const userSocketID = socketIdStore[index].socket;

  res.send({ userSocketID });
});

module.exports = router;
