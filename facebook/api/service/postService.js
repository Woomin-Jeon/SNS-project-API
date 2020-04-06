require('express-async-errors');
const postRepo = require('../repository/post.repository');

const postService = {
  async getAllPosts() {
    return await postRepo.getAllPosts();
  },

  async createPost(postInformation) {
    return await postRepo.createPost(postInformation);
  },

  async removePost(uniqueKey) {
    return await postRepo.removePost(uniqueKey);
  },

  async editPost(uniqueKey, updatedContents) {
    return await postRepo.editPost(uniqueKey, updatedContents);
  },

  async like(uniqueKey, userID) {
    return await postRepo.like(uniqueKey, userID);
  },

  async plusCommentCount(uniqueKey) {
    return await postRepo.plusCommentCount(uniqueKey);
  },
};

module.exports = postService;
