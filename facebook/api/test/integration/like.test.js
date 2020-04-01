const request = require('supertest');
const app = require('../../index');
const db = require('../../models/index');
const { Post } = require('../../models/post');

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
        .send({ uniqueKey, currentUserID });
      const { timeLinePosts } = res.body;

      expect(timeLinePosts[0].thumbCount).toHaveLength(1);
      expect(res.status).toBe(200);
    });
  });
});
