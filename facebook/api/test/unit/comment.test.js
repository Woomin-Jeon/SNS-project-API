const CommentRepo = require('../../repository/comment.repository');
const KeyRepo = require('../../repository/key.repository');
const Comment = require('../../models/comment');

describe('CommentRepo', () => {
  let validComment;

  beforeEach(() => {
    KeyRepo.getKey = jest.fn().mockResolvedValue('TEST_KEY');

    validComment = {
      uniqueKey: 999,
      id: 'TEST_COMMENT_ID',
      writerID: 'TEST_WRITER_ID',
      writer: 'TEST_WRITER_NAME',
      statement: 'COMMENT_STATEMENT',
      childComment: [],
      isChildCommentFunctionOn: false,
      commentThumbCount: [],
    };
  });

  describe('getAllComments', () => {
    beforeEach(() => {
      Comment.find = jest.fn().mockResolvedValue([{
        uniqueKey: 999,
        id: 'TEST_COMMENT_ID',
        writerID: 'TEST_WRITER_ID',
        writer: 'TEST_WRITER_NAME',
        statement: 'COMMENT_STATEMENT',
        childComment: [],
        isChildCommentFunctionOn: false,
        commentThumbCount: [],
      }, { example: 'comment 1' }, { example: 'comment 2'}, { example: 'etc...'}]);
    });

    it('returns comments', async () => {
      const comments = await CommentRepo.getAllComments();
      expect(comments.length).toBe(4);
    });
  });

  describe('createComment', () => {
    let uniqueKey;
    let id;
    let name;
    let contents;

    describe('with all arguments', () => {
      beforeEach(() => {
        uniqueKey = 999;
        id = 'TEST_COMMENT_ID';
        name = 'TEST_WRITER_NAME';
        contents = 'COMMENT_STATEMENT';

        Comment.create = jest.fn().mockResolvedValue({
          uniqueKey: 999,
          id: 'TEST_COMMENT_ID',
          writerID: 'TEST_WRITER_ID',
          writer: 'TEST_WRITER_NAME',
          statement: 'COMMENT_STATEMENT',
          childComment: [],
          isChildCommentFunctionOn: false,
          commentThumbCount: [],
        })
      });

      it('returns new comment', async () => {
        const comment = await CommentRepo.createComment(uniqueKey, id, name, contents);
        expect(comment).toEqual(validComment);
      });
    });

    describe('with insufficient arguments', () => {
      beforeEach(() => {
        uniqueKey = 999;
        id;
        name;
        contents = 'COMMENT_STATEMENT';

        Comment.create = jest.fn().mockResolvedValue({
          uniqueKey: 999,
          id: 'TEST_COMMENT_ID',
          writerID: null,
          writer: null,
          statement: 'COMMENT_STATEMENT',
          childComment: [],
          isChildCommentFunctionOn: false,
          commentThumbCount: [],
        })
      });

      it('returns error', async () => {
        const comment = await CommentRepo.createComment(uniqueKey, id, name, contents);
        const validation = comment === validComment ? 'correct' : 'error';
        expect(validation).toBe('error');
      });
    });
  });

  describe('like', () => {
    let uniqueKey;
    let id;
    let commentThumbCount;

    beforeEach(() => {
      commentThumbCount = ['example'];
      uniqueKey = 999;
      id = 'TEST_ID';

      Comment.updateOne = jest.fn().mockResolvedValue({
        commentThumbCount: ['example', id],
      });
    });

    it('returns commentThumbCount.length + 1', async () => {
      const comment = await CommentRepo.like(uniqueKey, id);
      expect(comment.commentThumbCount.length).toBe(commentThumbCount.length + 1);
    });
  });

  describe('addChildComment', () => {
    let uniqueKey;
    let contents;
    let id;

    let childComment;

    beforeEach(() => {
      uniqueKey = 999;
      contents = 'TEST_CONTENTS';
      id = 'TEST_ID';

      childComment = ['example'];

      Comment.updateOne = jest.fn().mockResolvedValue({
        childComment: [
          'example',
          {
            id: 'TEST_WRITER_ID',
            name: 'TEST_WRITER_NAME',
            statement: 'TEST_STATEMENT',
          },
        ]
      })
    });

    it('returns childComment.length + 1', async () => {
      const comment = await  CommentRepo.addChildComment(uniqueKey, contents, id);
      expect(comment.childComment.length).toBe(childComment.length + 1);
    });
  });
});
