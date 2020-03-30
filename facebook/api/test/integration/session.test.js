const request = require('supertest');
const app = require('../../index');
const UserRepo = require('../../repository/user.repository');
const { testUserSchema } = require('../../models/x_test');
const validate = require('../../middleware/validate');

describe('/session', () => {
  describe('GET /session', () => {
    describe('with existing session', () => {

      beforeEach(() => {
        validate.val = jest.fn().mockImplementation(() => next());
      });

      it('returns the corresponding user', async () => {
        const res = await request(app).get('/session');

        expect(res.status).toBe(200);
      });
    });
  });
});
