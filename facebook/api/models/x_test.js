const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testPostSchema = new Schema({
  uniqueKey: Number,
  id: String, // 이 게시글을 누가 썼는지 식별
  name: String, // 이 게시글을 쓴 User의 이름
  profile: String, // 게시글을 쓴 사람의 프로필사진 경로
  contents: String, // 게시글의 내용
  time: Array, // 게시글이 작성된 시간
  image: String, // 게시글에 등록된 사진 경로
  thumbCount: Array, // 좋아요 개수. 배열의 길이를 반환하여 출력
  sharingCount: Number, // 공유 개수를 출력
  commentCount: Number, // 게시글에 달린 댓글 개수를 출력
  isEditButtonClicked: Boolean, // 수정버튼이 눌렸는가?
});

const testUserSchema = new Schema({
  id: String,
  pw: String,
  userName: String,
  birth: String,
  location: String,
  email: String,
  friends: Array,
  profile: String,
  online: Boolean,
});

const testCommentSchema = new Schema({
  uniqueKey: Number,
  id: Number, // 어떤 게시글에 달린 댓글인지 확인하기 위한 것
  writerID: String, // 댓글 쓰는 사람의 ID // owner
  writer: String, // 댓글 쓰는 사람의 Name
  statement: String, // 댓글의 내용
  childComment: Array, // 대댓글이 담길 배열
  isChildCommentFunctionOn: Boolean, // 대댓글 창 Open?
  commentThumbCount: Array, // 좋아요 누른 사람의 ID가 담길 배열
});

const testPost = mongoose.model('test_post', testPostSchema);
const testUser = mongoose.model('test_user', testUserSchema);
const testComment = mongoose.model('test_comment', testCommentSchema);

exports.testPostSchema = testPost;
exports.testUserSchema = testUser;
exports.testCommentSchema = testComment;
