const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  uniqueKey: Number,
  id: Number, // 어떤 게시글에 달린 댓글인지 확인하기 위한 것
  writerID: String, // 댓글 쓰는 사람의 ID // owner
  writer: String, // 댓글 쓰는 사람의 Name
  statement: String, // 댓글의 내용
  childComment: Array, // 대댓글이 담길 배열
  isChildCommentFunctionOn: Boolean, // 대댓글 창 Open?
  commentThumbCount: Array, // 좋아요 누른 사람의 ID가 담길 배열
});

module.exports = mongoose.model('comment', commentSchema);
