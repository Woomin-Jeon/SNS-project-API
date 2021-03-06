const method = require('../../utils/methods');
const Key = require('../../models/key');

describe('method', () => {
  describe('checkPassword', () => {
    const user = { id: 'TEST_ID' };
    const pw = 'RIGHT_PASSWORD';

    describe('with password is correct', () => {
      beforeEach(() => {
        user.pw = pw;
      });

      it('returns true', () => {
        const validation = method.checkPassword(user, pw);

        expect(validation).toBe(true);
      });
    });

    describe('with wrong password', () => {
      beforeEach(() => {
        user.pw = 'WRONG_PASSWORD';
      });

      it('returns false', () => {
        const validation = method.checkPassword(user, pw);

        expect(validation).toBe(false);
      });
    });
  });
});
