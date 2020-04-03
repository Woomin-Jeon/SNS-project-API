const request = require('supertest');
const app = require('../../index');
const db = require('../../models/index');
const Comment = require('../../models/comment');
const commentRepo = require('../../repository/comment.repository');

if (process.env.NODE_ENV === 'test') {
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
          .send({uniqueKey, currentUserID});
        const {postComments} = res.body;

        expect(postComments[0].commentThumbCount).toHaveLength(1);
        expect(res.status).toBe(200);
      });

      describe('with server error', () => {
        beforeEach(() => {
          commentRepo.like = jest.fn().mockRejectedValue('Test(server error)');
        });

        it('responds 500', async () => {
          const res = await request(app).patch('/commentlike')
            .send({uniqueKey, currentUserID});

          expect(res.status).toBe(500);
        });
      });
    });
  });
}
