const express = require('express');
const router = express.Router();
const method = require('../utils/methods');
const wrapAsync = require('../middleware/wrapAsync');

// 파일 업로드
router.post('/', wrapAsync(async (req, res) => {
  const key = await method.getKey();
  const file = req.files.file;
  const filePath = `${__dirname}/../../FrontEnd/img/${key.id}${file.name}`;

  file.mv(filePath, () => {
    res.json({ fileName: file.name, filePath: `/img/${key.id}${file.name}` });
  });
}));

module.exports = router;
