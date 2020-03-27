const postService = require('../../service/postService');
const postRepo = require('../../repository/post.repository');
const method = require('../../utils/methods');

describe('postService', () => {
  beforeEach(() => {
    method.getKey = jest.fn().mockResolvedValue(999);
  });

  describe('createPost', () => {
    let post_prototype;

    let id;
    let name;
    let contents;
    let profile;
    let imagePath;
    let time;

    beforeEach(() => {
      post_prototype = {
        uniqueKey: 999,
        id: 'TEST_ID',
        name: 'TEST_NAME',
        profile: 'TEST_PROFILE',
        contents: 'TEST_CONTENTS',
        time: ['TEST_TIME'],
        image: 'TEST_IMAGE',
        thumbCount: ['TEST_THUMBCOUNT'],
        sharingCount: 0,
        commentCount: 0,
        isEditButtonClicked: false,
      };

      id = 'TEST_ID';
      name = 'TEST_NAME';
      contents = 'TEST_CONTENTS';
      profile = 'TEST_PROFILE';
      imagePath = 'TEST_IMAGE';
      time = ['TEST_TIME'];

      postRepo.createPost = jest.fn().mockResolvedValue(post_prototype);
    });

    it('returns new post', async () => {
      const post = await postService.createPost(id, name, contents, profile, imagePath, time);

      expect(post).toBeDefined();
    });
  });

  describe('editPost', () => {
    let uniqueKey;
    let updatedContents;

    beforeEach(() => {
      uniqueKey = 999;
      updatedContents = 'UPDATED_CONTENTS';

      postRepo.editPost = jest.fn().mockResolvedValue({
        uniqueKey: uniqueKey,
        id: 'TEST_ID',
        name: 'TEST_NAME',
        profile: 'TEST_PROFILE',
        contents: updatedContents,
        time: ['TEST_TIME'],
        image: 'TEST_IMAGE',
        thumbCount: ['TEST_THUMBCOUNT'],
        sharingCount: 0,
        commentCount: 0,
        isEditButtonClicked: false,
      });
    });

    it('returns updated contents', async () => {
      const post = await postService.editPost(uniqueKey, updatedContents);

      expect(post).toHaveProperty('contents', updatedContents);
    });
  });

  describe('getAllPosts', () => {
    beforeEach(() => {
      postRepo.getAllPosts = jest.fn().mockResolvedValue([
        {
          uniqueKey: 999,
          id: 'TEST_ID',
          name: 'TEST_NAME',
          profile: 'TEST_PROFILE',
          contents: 'TEST_CONTENTS',
          time: ['TEST_TIME'],
          image: 'TEST_IMAGE',
          thumbCount: ['TEST_THUMBCOUNT'],
          sharingCount: 0,
          commentCount: 0,
          isEditButtonClicked: false,
        }, { example: 'post 1' }, { example: 'post 2' }, { example: 'etc...'}
      ]);
    });

    it('returns posts', async () => {
      const posts = await postService.getAllPosts();

      expect(posts).toHaveLength(4);
    });
  });

  describe('removePost', () => {
    let uniqueKey;
    let willBeRemovedPost;

    beforeEach(() => {
      uniqueKey = 'valid uniqueKey';
      willBeRemovedPost = {
        uniqueKey: 'valid uniqueKey',
        id: 'TEST_ID',
        name: 'TEST_NAME',
        profile: 'TEST_PROFILE',
        contents: 'TEST_CONTENTS',
        time: ['TEST_TIME'],
        image: 'TEST_IMAGE',
        thumbCount: ['TEST_THUMBCOUNT'],
        sharingCount: 0,
        commentCount: 0,
        isEditButtonClicked: false,
      };

      postRepo.removePost = jest.fn().mockResolvedValue(willBeRemovedPost);
    });

    it('returns removed post', async () => {
      const post = await postService.removePost(uniqueKey);

      expect(post).toMatchObject(willBeRemovedPost);
    });
  });
});
