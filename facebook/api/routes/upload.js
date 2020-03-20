const express = require('express');
const router = express.Router();

const Key = require('../models/key');

// 파일 업로드
router.post('/', async (req, res) => {
  if (req.files === null) {
    res.status(400).json({ message: 'No file uploaded' });
    return;
  }

  await Key.updateOne(
    { id: 'key' },
    { $inc: { key: +1 } },
  );
  const key = await Key.findOne({ id: 'key' });

  const file = req.files.file;
  const filePath = `${__dirname}/../../FrontEnd/img/${key.id}${file.name}`;
  // util.promisify() 사용해서 콜백 제거
  file.mv(filePath, err => {
    if (err) {
      console.error(err);
      res.status(400).send(err);
      return;
    }

    res.json({ fileName: file.name, filePath: `/img/${key.id}${file.name}` });
  });
});

module.exports = router;
