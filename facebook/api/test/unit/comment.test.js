const CommentRepo = require('../../repository/comment.repository');
const KeyRepo = require('../../repository/key.repository');
const Comment = require('../../models/comment');


describe('CommentRepo', () => {
  let commentData;
  beforeEach(() => {
    KeyRepo.getKey = jest.fn().mockResolvedValue('TEST_KEY');
  });

  describe('createComment', () => {
    describe('with comment is created', () => {
      beforeEach(() => {
        Comment.create = jest.fn().mockResolvedValue(commentData = 'CREATED_COMMENT');
      });

      it('returns defined', async () => {
        const comment = await CommentRepo.createComment();
        expect(comment).toBeDefined();
      });
    });
  });

  describe('getAllComments', () => {
    describe('with comment exist', () => {
      beforeEach(() => {
        Comment.find = jest.fn().mockResolvedValue(commentData);
      });

      it('returns defined', async () => {
        const comment = await CommentRepo.getAllComments();
        expect(comment).toBeDefined();
      });
    });
  });

  describe('like', () => {
    describe('with like is updated', () => {
      beforeEach(() => {
        Comment.updateOne = jest.fn().mockResolvedValue('LIKED');
      });

      it('returns "LIKED"', async () => {
        const like = await CommentRepo.like();
        expect(like).toBe('LIKED');
      })
    })
  });

  describe('addChildComment', () => {
    describe('with child comment exist', () => {
      beforeEach(() => {
        Comment.updateOne = jest.fn().mockResolvedValue('ChILD_COMMENT');
      });

      it('returns defined', async () => {
        const childComment = await CommentRepo.addChildComment();
        expect(childComment).toBeDefined();
      })
    });
  });
});
