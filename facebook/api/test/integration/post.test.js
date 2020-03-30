
const app = require('../../index');
const PostRepo = require('../../repository/post.repository');
const { testPostSchema } = require('../../models/x_test');
const request = require('supertest');

describe('posts', () => {
  describe('GET /posts', () => {
    let Post;

    beforeEach(() => {
      Post = new testPostSchema();
      Post.id = 'TEST_ID';
      Post.name = 'TEST_NAME';
      Post.profile = 'TEST_PROFILE_PATH';
      Post.contents = 'TEST_CONTENTS';
      Post.save();

      PostRepo.getAllPosts = jest.fn().mockImplementation(
        async v => await testPostSchema.find()
      );
    });

    afterEach(() => {
      testPostSchema.collection.drop();
    });

    it('returns posts', async () => {
      const res = await request(app).get('/posts');
      const { timeLinePosts } = res.body;

      expect(timeLinePosts).toHaveLength(1);
      expect(res.status).toBe(200);
    });
  });

  describe('POST /posts', () => {
    let id;
    let name;
    let contents;
    let profile;
    let imagePath;
    let time;

    describe('with sufficient request arguments', () => {
      beforeEach(() => {
        id = 'POST_TEST_ID';
        name = 'POST_TEST_NAME';
        contents = 'POST_TEST_CONTENTS';
        profile = 'POST_PROFILE';
        imagePath = 'POST_TEST_IMAGEPATH';
        time = ['POST_TEST_TIME'];

        PostRepo.createPost = jest.fn().mockImplementation(
          async v => await testPostSchema.create(
            {
              id, name, contents, profile, imagePath, time, uniqueKey: 999
            },
          )
        );
      });

      it('returns posts', async () => {
        const res = await request(app)
          .post('/posts')
          .send({ id, name, contents, profile, imagePath, time });

        const { timeLinePosts } = res.body;

        expect(timeLinePosts).toHaveLength(1);
        expect(res.status).toBe(200);
      });
    });

    describe('with insufficient request arguments', () => {
      it('returns 400', async () => {
        const res = await request(app)
          .post('/posts')
          .send();

        expect(res.status).toBe(400);
      });
    });
  });

  describe('PATCH /posts', () => {
    let updatedContents;
    let uniqueKey;

    beforeEach(() => {
      updatedContents = 'UPDATED_CONTENTS';
      uniqueKey = 999;

      PostRepo.editPost = jest.fn().mockImplementation(
        async v => await testPostSchema.updateOne(
          { uniqueKey: uniqueKey },
          { $set : { contents: updatedContents } },
        )
      );
    });

    it('returns posts with updated post', async () => {
      const res = await request(app)
        .patch('/posts')
        .send({ uniqueKey, updatedContents });

      const { timeLinePosts } = res.body;

      expect(timeLinePosts[0].contents).toBe('UPDATED_CONTENTS');
      expect(res.status).toBe(200);
    });
  });

  describe('DELETE /posts', () => {
    beforeEach(() => {
      PostRepo.removePost = jest.fn().mockImplementation(
        async v => await testPostSchema.deleteOne(
          { uniqueKey: 999 },
        )
      );
    });

    it('returns posts except deleted post', async () => {
      const res = await request(app)
        .delete('/posts/:uniquekey');

      const { timeLinePosts } = res.body;

      expect(timeLinePosts).toHaveLength(0);
      expect(res.status).toBe(200);
    });
  });
});
