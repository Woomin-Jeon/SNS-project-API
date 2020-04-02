const request = require('supertest');
const app = require('../../index');
const db = require('../../models/index');
const Comment = require('../../models/comment');
const { Post } = require('../../models/post');
const method = require('../../utils/methods');

if (process.env.NODE_ENV === 'test') {
  describe('/comments', () => {
    describe('GET (getAllComments)', () => {
      beforeEach(async () => {
        const commentSchema1 = new Comment();
        commentSchema1.writer = 'TEST_WRITER_1';
        commentSchema1.statement = 'TEST_STATEMENTS_1';
        await commentSchema1.save();

        const commentSchema2 = new Comment();
        commentSchema2.writer = 'TEST_WRITER_2';
        commentSchema2.statement = 'TEST_STATEMENTS_2';
        await commentSchema2.save();
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('responds comments', async () => {
        const res = await request(app).get('/comments');
        const {postComments} = res.body;

        expect(postComments).toHaveLength(2);
        expect(res.status).toBe(200);
      });
    });

    describe('POST (createComment)', () => {
      let uniqueKey;
      let currentUserID;
      let currentUserName;
      let commentContents;

      beforeEach(() => {
        uniqueKey = 123;
        currentUserID = 'TEST_USER_ID';
        currentUserName = 'TEST_USER_NAME';
        commentContents = 'TEST_COMMENT_CONTENTS';

        method.getKey = jest.fn().mockResolvedValue(999);
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('responds comments with added one', async () => {
        const res = await request(app).post('/comments')
          .send({uniqueKey, currentUserID, currentUserName, commentContents});
        const {postComments} = res.body;

        expect(postComments).toHaveLength(1);
      });
    });

    describe('PATCH (plusCommentCount)', () => {
      let uniqueKey;

      beforeEach(async () => {
        uniqueKey = 999;

        const postSchema = new Post();
        postSchema.uniqueKey = 999;
        postSchema.commentCount = 0;
        await postSchema.save();
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('responds posts with comment count +1', async () => {
        const res = await request(app).patch('/comments')
          .send({uniqueKey});
        const {timeLinePosts} = res.body;

        expect(timeLinePosts[0].commentCount).toBe(1);
      });
    });
  });
}
