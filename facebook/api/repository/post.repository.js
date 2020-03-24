const KeyRepo = require('./key.repository');
const Post = require('../models/post');

const PostRepo = {
  async getAllPosts() {
    return await Post.find();
  },

  async createPost(id, name, contents, profile, imagePath, time) {
    const key = await KeyRepo.getKey();
    await Post.create({
      uniqueKey: key.key,
      id,
      name,
      profile,
      contents,
      time,
      image: imagePath,
      thumbCount: [],
      sharingCount: 0,
      commentCount: 0,
      isEditButtonClicked: false,
    });
  },

  async removePost(uniqueKey) {
    await Post.deleteOne({ uniqueKey: uniqueKey});
  },

  async editPost(uniqueKey, updatedContents) {
    await Post.updateOne(
      { uniqueKey: uniqueKey },
      { $set : { contents: updatedContents } },
    );
  },

  async like(uniqueKey, userID) {
    await Post.updateOne(
      { uniqueKey: uniqueKey },
      { $addToSet: { thumbCount: userID } }
    );
  },

  async plusCommentCount(uniqueKey) {
    await Post.updateOne(
      { uniqueKey: uniqueKey },
      { $inc: { commentCount: +1 } },
    );
  }
};

module.exports = PostRepo;
