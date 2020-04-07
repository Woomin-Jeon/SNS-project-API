const request = require('supertest');
const app = require('../../app');
const db = require('../../models/test_db');
const { Post } = require('../../models/post');
const method = require('../../utils/methods');
const postRepo = require('../../repository/post.repository');

if (process.env.NODE_ENV === 'test') {
  describe('posts', () => {
    describe('POST (createPost)', () => {
      describe('with vaild arguments', () => {
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

        it('responds posts with added post', async () => {
          const res = await request(app).post('/posts')
            .send({ id, name, contents, profile });
          const { timeLinePosts } = res.body;

          expect(timeLinePosts).toHaveLength(1);
          expect(res.status).toBe(200);
        })
      });

      describe('with invaild arguments', () => {
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

      describe('with server error', () => {
        let id;
        let name;
        let contents;
        let profile;

        beforeEach(() => {
          id = 'TEST_ID';
          name = 'TEST_NAME';
          contents = 'TEST_CONTENTS';
          profile = 'TEST_PROFILE';

          postRepo.createPost = jest.fn().mockRejectedValue('Test(serverError)');
        });

        it('responds 500', async () => {
          const res = await request(app).post('/posts')
            .send({ id, name, contents, profile });

          expect(res.status).toBe(500);
        });
      });
    });

    describe('DELETE (removePost)', () => {
      describe('with vailid uniqueKey', () => {
        beforeEach(async () => {
          const postSchema = new Post();
          postSchema.uniqueKey = 999;
          postSchema.contents = 'TEST_POST_CONTENTS';
          await postSchema.save();
        });

        afterEach(async () => {
          await db.dropDatabase();
        });

        it('responds posts excluding the deleted post', async () => {
          const res = await request(app).delete('/posts/999');
          const { timeLinePosts } = res.body;

          expect(timeLinePosts).toHaveLength(0);
          expect(res.status).toBe(200);
        });
      });

      describe('with invaild uniqueKey', () => {
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

      describe('with server error', () => {
        beforeEach(() => {
          postRepo.removePost = jest.fn().mockRejectedValue('Test(serverError)');
        });

        it('responds 500', async () => {
          const res = await request(app).delete('/posts/999');

          expect(res.status).toBe(500);
        });
      });
    });

    describe('PATCH (editPost)', () => {
      let uniqueKey;
      let updatedContents;

      describe('with vailid uniqueKey', () => {
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

        it('responds posts with updated post', async () => {
          const res = await request(app).patch('/posts')
            .send({ uniqueKey, updatedContents });

          const { timeLinePosts } = res.body;

          expect(timeLinePosts[0].contents).toBe(updatedContents);
          expect(res.status).toBe(200);
        });
      });

      describe('with invaild uniqueKey', () => {
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

      describe('with server error', () => {
        beforeEach(() => {
          postRepo.editPost = jest.fn().mockRejectedValue('Test(serverError)');
        });

        it('responds 500', async () => {
          const res = await request(app).patch('/posts')
            .send({uniqueKey, updatedContents});

          expect(res.status).toBe(500);
        });
      });
    });

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

      describe('with server error', () => {
        beforeEach(() => {
          postRepo.getAllPosts = jest.fn().mockRejectedValue('Test(serverError)');
        });

        it('responds 500', async () => {
          const res = await request(app).get('/posts');

          expect(res.status).toBe(500);
        });
      });
    });
  });
}
