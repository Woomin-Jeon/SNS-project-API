const express = require('express');
const router = express.Router();
const multer = require('multer');
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

AWS.config.update({
  accessKeyId: process.env.AWS_KEY_ID,
  secretAccessKey: process.env.AWS_ACCESS_KEY,
  region : 'ap-northeast-2'
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3({ /* ... */ }),
    bucket: "woomin-facebook-images",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    acl: 'public-read',
    key: (req, file, cb) => {
      cb(null, file.originalname)
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
});

router.post('/', upload.single('woomin-facebook'), (req, res) => {
  const filePath = { url: req.file.location };

  res.send({ filePath });
});

module.exports = router;
