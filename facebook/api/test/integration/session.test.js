const request = require('supertest');
const app = require('../../index');
const UserRepo = require('../../repository/user.repository');
const { testUserSchema } = require('../../models/x_test');
const validator = require('../../middleware/validators');

describe('/session', () => {
  describe('GET /session', () => {
    describe('with existing session', () => {

      beforeEach(() => {
        validator.sessionValidator = jest.fn().mockReturnValue(true);
      });

      it('returns corresponding user', async () => {
        const res = await request(app).get('/session');

        expect(res.status).toBe(200);
      });
    });
  });
});
