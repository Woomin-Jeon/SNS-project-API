const express = require('express');
const router = express.Router();
const Method = require('../utils/methods');

// 파일 업로드
router.post('/', async (req, res) => {
  if (req.files === null) {
    res.status(400).json({ message: 'No file' });
    return;
  }

  const key = Method.getKey();
  const file = req.files.file;
  const filePath = `${__dirname}/../../FrontEnd/img/${key.id}${file.name}`;

  file.mv(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(400).send(err);
      return;
    }

    res.json({ fileName: file.name, filePath: `/img/${key.id}${file.name}` });
  });
});

module.exports = router;
