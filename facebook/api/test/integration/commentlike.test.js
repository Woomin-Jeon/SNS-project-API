const request = require('supertest');
const app = require('../../index');
const db = require('../../models/index');
const Comment = require('../../models/comment');

describe('/commentlike', () => {
  describe('/PATCH (like)', () => {
    let uniqueKey;
    let currentUserID;

    beforeEach(async () => {
      uniqueKey = 999;
      currentUserID = 'COMMENT_LIKE_USER';

      const commentSchema = new Comment();
      commentSchema.uniqueKey = 999;
      commentSchema.commentThumbCount = [];
      await commentSchema.save();
    });

    afterEach(async () => {
      await db.dropDatabase();
    });

    it('responds comments with like count +1', async () => {
      const res = await request(app).patch('/commentlike')
        .send({ uniqueKey, currentUserID });
      const { postComments } = res.body;

      expect(postComments[0].commentThumbCount).toHaveLength(1);
      expect(res.status).toBe(200);
    });
  });
});
