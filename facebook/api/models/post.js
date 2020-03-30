const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
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

const Post = mongoose.model('post', postSchema);

const validatePost = (req) => {
  const { id, name, contents, profile } = req.body;

  if (!id || !name || !contents || !profile) {
    return false;
  }

  return true;
};

exports.validatePost = validatePost;
exports.Post = Post;
