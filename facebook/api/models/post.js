const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  uniqueKey: Number,
  id: String, // 이 게시글을 누가 썼는지 식별
  name: String, // 이 게시글을 쓴 User의 이름
  contents: String, // 게시글의 내용
  thumbCount: Array, // 좋아요 개수. 배열의 길이를 반환하여 출력
  sharingCount: Number, // 공유 개수를 출력
  commentCount: Number, // 게시글에 달린 댓글 개수를 출력
  isEditButtonClicked: Boolean, // 수정버튼이 눌렸는가?
});

module.exports = mongoose.model('post', postSchema);
