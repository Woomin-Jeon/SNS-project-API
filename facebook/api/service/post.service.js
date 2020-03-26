const PostRepo = require('../repository/post.repository');

const PostService = {
  async getAllPosts() {
    return await PostRepo.getAllPosts();
  },

  async createPost(id, name, contents, profile, imagePath, time) {
    return await PostRepo.createPost(id, name, contents, profile, imagePath, time);
  },

  async removePost(uniqueKey) {
    return await PostRepo.removePost(uniqueKey);
  },

  async editPost(uniqueKey, updatedContents) {
    return await PostRepo.editPost(uniqueKey, updatedContents);
  },

  async like(uniqueKey, userID) {
    return await PostRepo.like(uniqueKey, userID);
  },

  async plusCommentCount(uniqueKey) {
    return await PostRepo.plusCommentCount(uniqueKey);
  },
};

module.exports = PostService;
