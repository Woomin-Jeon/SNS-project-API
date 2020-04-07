const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const scrapSchema = new Schema({
  uniqueKey: Number,
  id: String, // 스크랩 한 사람의 ID
  whoDid: String, // 스크랩 한 사람의 Name
  name: String, // 스크랩 된 게시글을 쓴 User의 Name
  profile: String, // 스크랩 된 게시글을 쓴 User의 Profile
  contents: String, // 스크랩 된 게시글의 내용
});

module.exports = mongoose.model('scrap', scrapSchema);
