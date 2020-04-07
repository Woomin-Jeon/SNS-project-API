const commentService = require('../../service/commentService');
const commentRepo = require('../../repository/comment.repository');
const method = require('../../utils/methods');

describe('commentService', () => {
  let validComment;

  beforeEach(() => {
    method.getKey = jest.fn().mockResolvedValue('TEST_KEY');

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
      commentRepo.getAllComments = jest.fn().mockResolvedValue([{
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
      const comments = await commentService.getAllComments();

      expect(comments).toHaveLength(4);
    });
  });

  describe('createComment', () => {
    let uniqueKey;
    let id;
    let name;
    let contents;

    beforeEach(() => {
      uniqueKey = 999;
      id = 'TEST_COMMENT_ID';
      name = 'TEST_WRITER_NAME';
      contents = 'COMMENT_STATEMENT';

      commentRepo.createComment = jest.fn().mockResolvedValue({
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
      const comment = await commentService.createComment(uniqueKey, id, name, contents);

      expect(comment).toEqual(validComment);
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

      commentRepo.like = jest.fn().mockResolvedValue({
        commentThumbCount: ['example', id],
      });
    });

    it('returns commentThumbCount.length + 1', async () => {
      const comment = await commentService.like(uniqueKey, id);

      expect(comment.commentThumbCount).toHaveLength(commentThumbCount.length + 1);
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

      commentRepo.addChildComment = jest.fn().mockResolvedValue({
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
      const comment = await  commentService.addChildComment(uniqueKey, contents, id);

      expect(comment.childComment).toHaveLength(childComment.length + 1);
    });
  });
});
