const login = require('../function/login');

describe('test', () => {
  let id = 'a';
  let pw = 'a';

  it('A test to verify that the ID and Password match', () => {
    login.passwordCheck(id, pw).then(validation => {
      expect(validation).toBe(false);
    });
  });
});
