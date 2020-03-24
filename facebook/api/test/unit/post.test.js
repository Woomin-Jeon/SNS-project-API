const db = require('../../index');
const PostRepo = require('../../repository/post.repository');
const PostSchema = require('../../models/post');

describe('post.repository test', () => {
  beforeEach(() => {
    post.create({}) // 모킹
  })
  it('getAllPosts validation check', async () => {
    const posts = await PostRepo.getAllPosts();

    expect(post).toBeDefined();
  });
});
