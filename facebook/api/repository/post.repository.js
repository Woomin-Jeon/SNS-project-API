const Method = require('../utils/methods');
const { Post } = require('../models/post');

const postRepo = {
  async getAllPosts() {
    return await Post.find();
  },

  async createPost(postInformation) {
    const { id, name, contents, profile, imagePath, time } = postInformation;

    const key = await Method.getKey();
    return await Post.create({
      uniqueKey: key,
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
    return await Post.deleteOne({ uniqueKey: uniqueKey });
  },

  async editPost(uniqueKey, updatedContents) {
    return await Post.updateOne(
      { uniqueKey: uniqueKey },
      { $set : { contents: updatedContents } },
    );
  },

  async like(uniqueKey, userID) {
    return await Post.updateOne(
      { uniqueKey: uniqueKey },
      { $addToSet: { thumbCount: userID } }
    );
  },

  async plusCommentCount(uniqueKey) {
    return await Post.updateOne(
      { uniqueKey: uniqueKey },
      { $inc: { commentCount: +1 } },
    );
  }
};

module.exports = postRepo;
