const request = require('supertest');
const app = require('../../index');
const { User } = require('../../models/user');
const db = require('../../models/index');

describe('/login', () => {
  describe('GET (getAllUsers)', () => {
    beforeEach(async () => {
      const userSchema1 = new User();
      userSchema1.id = 'TEST_ID_1';
      userSchema1.pw = 'TEST_PASSWORD_1';
      await userSchema1.save();

      const userSchema2 = new User();
      userSchema2.id = 'TEST_ID_2';
      userSchema2.pw = 'TEST_PASSWORD_2';
      await userSchema2.save();
    });

    afterEach(async () => {
      await db.dropDatabase();
    });

    it('responds users with 200', async () => {
      const res = await request(app).get('/login');
      const { userStore } = res.body;

      expect(userStore).toHaveLength(2);
      expect(res.status).toBe(200);
    });
  });

  describe('POST (signUp)', () => {
    describe('with sufficient arguments', () => {
      let id;
      let pw;
      let userName;
      let birth;
      let location;
      let email;
      let profile;

      beforeEach(() => {
        id = 'TEST_ID';
        pw = 'TEST_PASSWORD';
        userName = 'TEST_NAME';
        birth = 'YYYY-MM-DD';
        location = 'TEST_LOCATION';
        email = 'TEST_EMAIL';
        profile = 'TEST_PROFILE';
      });

      afterEach(() => {
        db.dropDatabase();
      });

      it('responds 200', async () => {
        const res = await request(app).post('/login')
          .send({ id, pw, userName, birth, location, email, profile });

        expect(res.status).toBe(200);
      });
    });

    describe('with insufficient arguments', () => {
      let id;
      let pw;
      let userName;
      let birth;
      let location;
      let email;
      let profile;

      beforeEach(() => {
        id = 'TEST_ID';
        pw = 'TEST_PASSWORD';
        userName;
        birth = 'YYYY-MM-DD';
        location = 'TEST_LOCATION';
        email;
        profile = 'TEST_PROFILE';
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('responds 400', async () => {
        const res = await request(app).post('/login')
          .send({ id, pw, userName, birth, location, email, profile});

        expect(res.status).toBe(400);
      });
    });
  });
});
