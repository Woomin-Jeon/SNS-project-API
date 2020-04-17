const express = require('express');
const router = express.Router();
const method = require('../utils/methods');
const wrapAsync = require('../middleware/wrapAsync');

// 파일 업로드
router.post('/', wrapAsync(async (req, res) => {
  const key = await method.getKey();
  const file = req.files.file;
  const filePath = `${__dirname}/../img/${key}${file.name}`;

  file.mv(filePath, () => {
    res.json({ fileName: file.name, filePath: `https://woomin-facebook.herokuapp.com/img/${key}${file.name}` });
  });
}));

module.exports = router;
