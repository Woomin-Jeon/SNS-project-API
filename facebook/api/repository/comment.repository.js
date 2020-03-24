const KeyRepo = require('./key.repository');
const Comment = require('../models/comment');

const CommentRepo = {
  async getAllComments() {
    return await Comment.find();
  },

  async createComment(uniqueKey, currentUserID, currentUserName, commentContents) {
    const key = await KeyRepo.getKey();
    await Comment.create({
      uniqueKey: key.key,
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
    await Comment.updateOne(
      { uniqueKey: uniqueKey },
      { $addToSet: { commentThumbCount: userID } }
    );
  },

  async addChildComment(uniqueKey, contents, currentUserID, currentUserName) {
    await Comment.updateOne(
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
