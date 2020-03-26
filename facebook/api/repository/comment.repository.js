const Method = require('../utils/methods');
const Comment = require('../models/comment');

const CommentRepo = {
  async getAllComments() {
    return await Comment.find();
  },

  async createComment(uniqueKey, currentUserID, currentUserName, commentContents) {
    const key = await Method.getKey();
    return await Comment.create({
      uniqueKey: key,
      id: uniqueKey,
      writerID: currentUserID,
      writer: currentUserName,
      statement: commentContents,
      childComment: [],
      isChildCommentFunctionOn: false,
      commentThumbCount: [],
    });
  },

  async like(uniqueKey, userID) {
    return await Comment.updateOne(
      { uniqueKey: uniqueKey },
      { $addToSet: { commentThumbCount: userID } }
    );
  },

  async addChildComment(uniqueKey, contents, currentUserID, currentUserName) {
    return await Comment.updateOne(
      { uniqueKey: uniqueKey },
      { $push: {
          childComment: {
            id: currentUserID,
            name: currentUserName,
            statement: contents
          }
        }
      });
  }
};

module.exports = CommentRepo;
