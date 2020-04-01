const request = require('supertest');
const app = require('../../index');
const db = require('../../models/index');
const { User } = require('../../models/user');

describe('/friends', () => {
  describe('POST (addFriend)', () => {
    let currentUserID;
    let friendID;

    beforeEach(async () => {
      currentUserID = 'TEST_USER_ID';
      friendID = 'NEW_FRIEND_ID';

      const userSchema = new User();
      userSchema.id = 'TEST_USER_ID';
      userSchema.friends = [];
      await userSchema.save();
    });

    afterEach(async () => {
      await db.dropDatabase();
    });

    it('responds users with added friend', async () => {
      const res = await request(app).post('/friends')
        .send({ currentUserID, friendID });
      const { userStore } = res.body;

      expect(userStore[0].friends).toHaveLength(1);
      expect(res.status).toBe(200);
    });
  });

  describe('PATCH (removeFriend)', () => {
    let currentUserID;
    let friendID;

    beforeEach(async () => {
      currentUserID = 'TEST_USER_ID';
      friendID = 'WILL_BE_DELETED_FRIEND_ID';

      const userSchema = new User();
      userSchema.id = 'TEST_USER_ID';
      userSchema.friends = [];
      await userSchema.save();
    });

    afterEach(async () => {
      await db.dropDatabase();
    });

    it('responds user with deleted friend', async () => {
      const res = await request(app).patch('/friends')
        .send({ currentUserID, friendID });
      const { userStore } = res.body;

      expect(userStore[0].friends).toHaveLength(0);
      expect(res.status).toBe(200);
    });
  });
});
