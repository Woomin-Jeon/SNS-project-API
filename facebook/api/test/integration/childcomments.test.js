const request = require('supertest');
const app = require('../../index');
const db = require('../../models/index');
const Comment = require('../../models/comment');
const commentRepo = require('../../repository/comment.repository');

if (process.env.NODE_ENV === 'test') {
  describe('/childcomments', () => {
    describe('POST', () => {
      let uniqueKey;
      let contents;
      let currentUserID;
      let currentUserName;

      beforeEach(async () => {
        uniqueKey = 999;
        contents = 'TEST_CONTENTS';
        currentUserID = 'TEST_USER_ID';
        currentUserName = 'TEST_USER_NAME';

        const commentSchema = new Comment();
        commentSchema.uniqueKey = 999;
        commentSchema.childComment = [];
        await commentSchema.save();
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('responds comments with added childcomments', async () => {
        const res = await request(app).post('/childcomments')
          .send({ uniqueKey, contents, currentUserID, currentUserName });
        const { postComments } = res.body;

        expect(postComments[0].childComment).toHaveLength(1);
        expect(res.status).toBe(200);
      });

      describe('with server error', () => {
        beforeEach(() => {
          commentRepo.addChildComment = jest.fn().mockRejectedValue('Test(server error)');
        });

        it('responds 500', async () => {
          const res = await request(app).post('/childcomments')
            .send({ uniqueKey, contents, currentUserID, currentUserName })

          expect(res.status).toBe(500);
        });
      });
    });
  });
}
