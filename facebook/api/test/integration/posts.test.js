const request = require('supertest');
const app = require('../../index');
const db = require('../../models/index');
const { Post } = require('../../models/post');
const method = require('../../utils/methods');

describe('posts', () => {
  describe('GET (getAllPosts)', () => {
    beforeEach(async () => {
      const postSchema1 = new Post();
      postSchema1.id = 'TEST_POST_ID_1';
      postSchema1.contents = 'TEST_POST_CONTENTS_1';
      await postSchema1.save();

      const postSchema2 = new Post();
      postSchema2.id = 'TEST_POST_ID_2';
      postSchema2.contents = 'TEST_POST_CONTENTS_2';
      await postSchema2.save();
    });

    afterEach(async () => {
      await db.dropDatabase();
    });

    it('responds all posts', async () => {
      const res = await request(app).get('/posts');
      const { timeLinePosts } = res.body;

      expect(timeLinePosts).toHaveLength(2);
      expect(res.status).toBe(200);
    });
  });

  describe('POST (createPost)', () => {
    describe('with sufficient arguments', () => {
      let id;
      let name;
      let contents;
      let profile;

      beforeEach(() => {
        method.getKey = jest.fn().mockResolvedValue(999);

        id = 'TEST_ID';
        name = 'TEST_NAME';
        contents = 'TEST_CONTENTS';
        profile = 'TEST_PROFILE';
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('responds posts with added one', async () => {
        const res = await request(app).post('/posts')
          .send({ id, name, contents, profile });
        const { timeLinePosts } = res.body;

        expect(timeLinePosts).toHaveLength(1);
        expect(res.status).toBe(200);
      })
    });

    describe('with insufficient arguments', () => {
      let id;
      let name;
      let contents;
      let profile;

      beforeEach(() => {
        method.getKey = jest.fn().mockResolvedValue(999);

        id = 'TEST_ID';
        name;
        contents = 'TEST_CONTENTS';
        profile = 'TEST_PROFILE';
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('responds 400', async () => {
        const res = await request(app).post('/posts')
          .send({ id, name, contents, profile });

        expect(res.status).toBe(400);
      });
    });
  });

  describe('DELETE (removePost)', () => {
    describe('with matched uniqueKey', () => {
      beforeEach(async () => {
        const postSchema = new Post();
        postSchema.uniqueKey = 999;
        postSchema.contents = 'TEST_POST_CONTENTS';
        await postSchema.save();
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('responds posts without deleted one', async () => {
        const res = await request(app).delete('/posts/999');
        const { timeLinePosts } = res.body;

        expect(timeLinePosts).toHaveLength(0);
        expect(res.status).toBe(200);
      });
    });

    describe('with unmatched uniqueKey', () => {
      beforeEach(async () => {
        const postSchema = new Post();
        postSchema.uniqueKey = 123;
        postSchema.contents = 'TEST_POST_CONTENTS';
        await postSchema.save();
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('responds posts with no change', async () => {
        const res = await request(app).delete('/posts/999');
        const { timeLinePosts } = res.body;

        expect(timeLinePosts).toHaveLength(1);
        expect(res.status).toBe(200);
      });
    });
  });

  describe('PATCH (editPost)', () => {
    let uniqueKey;
    let updatedContents;

    describe('with matched uniqueKey', () => {
      beforeEach(async () => {
        uniqueKey = 999;
        updatedContents = 'UPDATED_TEST_CONTENTS';

        const postSchema = new Post();
        postSchema.uniqueKey = 999;
        postSchema.contents = 'ORIGINAL_TEST_CONTENTS';
        await postSchema.save();
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('responds posts with updated one', async () => {
        const res = await request(app).patch('/posts')
          .send({ uniqueKey, updatedContents });

        const { timeLinePosts } = res.body;

        expect(timeLinePosts[0].contents).toBe(updatedContents);
        expect(res.status).toBe(200);
      });
    });

    describe('with unmatched uniqueKey', () => {
      beforeEach(async () => {
        uniqueKey = 123;
        updatedContents = 'UPDATED_TEST_CONTENTS';

        const postSchema = new Post();
        postSchema.uniqueKey = 999;
        postSchema.contents = 'ORIGINAL_TEST_CONTENTS';
        await postSchema.save();
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('responds posts with no change', async () => {
        const res = await request(app).patch('/posts')
          .send({ uniqueKey, updatedContents });

        const { timeLinePosts } = res.body;

        expect(timeLinePosts[0].contents).toBe('ORIGINAL_TEST_CONTENTS');
        expect(res.status).toBe(200);
      });
    });
  });
});

