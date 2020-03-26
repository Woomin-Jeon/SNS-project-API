const CommentRepo = require('../repository/comment.repository');

const CommentService = {
  async getAllComments() {
    return await CommentRepo.getAllComments();
  },

  async createComment(uniqueKey, currentUserID, currentUserName, commentContents) {
    return await CommentRepo.createComment(uniqueKey, currentUserID, currentUserName, commentContents);
  },

  async like(uniqueKey, userID) {
    return await CommentRepo.like(uniqueKey, userID);
  },

  async addChildComment(uniqueKey, contents, currentUserID, currentUserName) {
    return await CommentRepo.addChildComment(uniqueKey, contents, currentUserID, currentUserName);
  }
};

module.exports = CommentService;
