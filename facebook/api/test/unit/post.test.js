const PostRepo = require('../../repository/post.repository');
const KeyRepo = require('../../repository/key.repository');
const Post = require('../../models/post');

describe('PostRepo', () => {
  beforeEach(() => {
    KeyRepo.getKey = jest.fn().mockResolvedValue(999);
  });

  describe('createPost', () => {
    let validPost;

    let id;
    let name;
    let contents;
    let profile;
    let imagePath;
    let time;

    beforeEach(() => {
      validPost = {
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
    });

    describe('with all arguments', () => {
      beforeEach(() => {
        Post.create = jest.fn().mockResolvedValue({
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
        });

        id = 'TEST_ID';
        name = 'TEST_NAME';
        contents = 'TEST_CONTENTS';
        profile = 'TEST_PROFILE';
        imagePath = 'TEST_IMAGE';
        time = ['TEST_TIME'];
      });

      it('returns new post', async () => {
        const post = await PostRepo.createPost(id, name, contents, profile, imagePath, time);
        expect(post).toEqual(validPost);
      });
    });

    describe('with insufficient arguments', () => {
      beforeEach(() => {
        Post.create = jest.fn().mockResolvedValue({
          uniqueKey: 999,
          id: null,
          name: 'TEST_NAME',
          profile: 'TEST_PROFILE',
          contents: null,
          time: ['TEST_TIME'],
          image: null,
          thumbCount: ['TEST_THUMBCOUNT'],
          sharingCount: 0,
          commentCount: 0,
          isEditButtonClicked: false,
        });

        id;
        name = 'TEST_NAME';
        contents;
        profile = 'TEST_PROFILE';
        imagePath;
        time = ['TEST_TIME'];
      });

      it('returns error', async () => {
        const post = await PostRepo.createPost(id, name, contents, profile, imagePath, time);
        const validation = post !== validPost ? 'error' : 'correct';
        expect(validation).toBe('error');
      });
    });
  });

  describe('editPost', () => {
    let uniqueKey;
    let updatedContents;

    describe('with valid uniqueKey', () => {
      beforeEach(() => {
        uniqueKey = 999;
        updatedContents = 'UPDATED_CONTENTS';

        Post.updateOne = jest.fn().mockResolvedValue({
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
        const post = await PostRepo.editPost(uniqueKey, updatedContents);
        expect(post.contents).toBe(updatedContents);
      });
    });

    describe('with invalid uniqueKey', () => {
      beforeEach(() => {
        uniqueKey = -999;
        updatedContents = 'UPDATED_CONTENTS';
        Post.updateOne = jest.fn().mockResolvedValue(null);
      });

      it('returns null', async () => {
        const post = await PostRepo.editPost(uniqueKey, updatedContents);
        expect(post).toBe(null);
      });
    });
  });

  describe('getAllPosts', () => {
    beforeEach(() => {
      Post.find = jest.fn().mockResolvedValue([
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
      const posts = await PostRepo.getAllPosts();
      expect(posts.length).toBe(4);
    });
  });

  describe('removePost', () => {
    let uniqueKey;
    let willBeRemovedPost;

    beforeEach(() => {
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
    });

    describe('with valid uniqueKey', () => {
      beforeEach(() => {
        Post.deleteOne = jest.fn().mockResolvedValue(willBeRemovedPost);
      });

      it('returns removed post', async () => {
        uniqueKey = 'valid uniqueKey';
        const post = await PostRepo.removePost(uniqueKey);
        expect(post).toEqual(willBeRemovedPost);
      });
    });

    describe('with invalid uniqueKey', () => {
      beforeEach(() => {
        Post.deleteOne = jest.fn().mockResolvedValue(null);
      });

      it('returns null', async () => {
        uniqueKey = 'invalid uniqueKey';
        const post = await PostRepo.removePost(uniqueKey);
        expect(post).toEqual(null);
      });
    });
  });
});
