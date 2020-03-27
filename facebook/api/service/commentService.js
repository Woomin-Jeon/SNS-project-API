const commentRepo = require('../repository/comment.repository');

const commentService = {
  async getAllComments() {
    return await commentRepo.getAllComments();
  },

  async createComment(uniqueKey, currentUserID, currentUserName, commentContents) {
    return await commentRepo.createComment(uniqueKey, currentUserID, currentUserName, commentContents);
  },

  async like(uniqueKey, userID) {
    return await commentRepo.like(uniqueKey, userID);
  },

  async addChildComment(uniqueKey, contents, currentUserID, currentUserName) {
    return await commentRepo.addChildComment(uniqueKey, contents, currentUserID, currentUserName);
  }
};

module.exports = commentService;
