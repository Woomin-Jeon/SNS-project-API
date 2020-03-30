const request = require('supertest');
const app = require('../../index');
const UserRepo = require('../../repository/user.repository');
const { testUserSchema } = require('../../models/x_test');

describe('/login', () => {
  describe('POST', () => {
    describe('with sufficient arguments', () => {
      let id;
      let pw;
      let userName;
      let birth;
      let location;
      let email;
      let profile;

      beforeEach(() => {
        id = 'SIGNUP_TEST_ID';
        pw = 'SIGNUP_TEST_PASSWORD';
        userName = 'SIGNUP_TEST_NAME';
        birth = 'SIGNUP_TEST_BIRTH';
        location = 'SIGNUP_TEST_LOCATION';
        email = 'SIGNUP_TEST_EMAIL';
        profile = 'SIGNUP_TEST_PROFILE';

        UserRepo.signUp = jest.fn().mockImplementation(
          async () => await testUserSchema.create({
            id, pw, userName, birth, location, email, friends: [], profile
          })
        );

        UserRepo.getAllUsers = jest.fn().mockImplementation(
          async () => await testUserSchema.find()
        );
      });

      it('creates new user', async () => {
        await request(app)
          .post('/login')
          .send({
            id, pw, userName, birth, location, email, profile
          });

        const res = await request(app).get('/login');

        const { userStore } = res.body;

        expect(userStore).toHaveLength(1);
        expect(res.status).toBe(200);
      });
    });

    describe('with insufficient arguments', () => {
      it('returns 400', async () => {
        const res = await request(app)
          .post('/login')
          .send();

        expect(res.status).toBe(400);
      });
    });
  });

  describe('GET', () => {
    beforeEach(() => {
      UserRepo.getAllUsers = jest.fn().mockImplementation(
        async () => await testUserSchema.find()
      );
    });

    afterEach(() => {
      testUserSchema.collection.drop();
    });

    it('returns users', async () => {
      const res = await request(app).get('/login');

      const { userStore } = res.body;

      expect(userStore).toHaveLength(1);
      expect(res.status).toBe(200);
    });
  });
});
