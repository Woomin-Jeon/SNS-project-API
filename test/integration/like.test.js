const request = require('supertest');
const app = require('../../app');
const db = require('../../models/test_db');
const { Post } = require('../../models/post');
const postRepo = require('../../repository/post.repository');

if (process.env.NODE_ENV === 'test') {
  describe('/like', () => {
    describe('PATCH (like)', () => {
      let uniqueKey;
      let currentUserID;

      beforeEach(async () => {
        uniqueKey = 999;
        currentUserID = 'TEST_USER_WHO_LIKED';

        const postSchema = new Post();
        postSchema.uniqueKey = 999;
        postSchema.thumbCount = [];
        await postSchema.save();
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('responds posts with applied like', async () => {
        const res = await request(app).patch('/like')
          .send({uniqueKey, currentUserID});
        const {timeLinePosts} = res.body;

        expect(timeLinePosts[0].thumbCount).toHaveLength(1);
        expect(res.status).toBe(200);
      });

      describe('with server error', () => {
        beforeEach(() => {
          postRepo.like = jest.fn().mockRejectedValue('Test(server error)');
        });

        it('responds 500', async () => {
          const res = await request(app).patch('/like')
            .send({uniqueKey, currentUserID});

          expect(res.status).toBe(500);
        });
      });
    });
  });
}
