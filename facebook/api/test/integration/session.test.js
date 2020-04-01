const request = require('supertest');
const app = require('../../index');
const db = require('../../models/index');
const validator = require('../../middleware/validators');
const validate = require('../../middleware/validate');
const { User } = require('../../models/user');

describe('/session', () => {
  describe('POST', () => {
    let userID;
    let userPW;
    let socketID;

    beforeEach(async () => {
      userID = 'TEST_USER_ID';
      userPW = 'TEST_USER_PASSWORD';
      socketID = 'TEST_SOCKET_ID';

      const userSchema = new User();
      userSchema.id = 'TEST_USER_ID';
      userSchema.pw = 'TEST_USER_PASSWORD';
      await userSchema.save();
    });

    it('responds user with session', async () => {
      const res = await request(app).post('/session')
        .send({ userID, userPW, socketID });

      const { user } = res.body;

      expect().toBe(1);
    });
  });
});
