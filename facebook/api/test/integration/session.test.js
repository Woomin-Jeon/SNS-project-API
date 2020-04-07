const request = require('supertest');
const app = require('../../app');
const db = require('../../models/test_db');
const { User } = require('../../models/user');
const userRepo = require('../../repository/user.repository');
const { socket } = require('../../socketio/socket');

if (process.env.NODE_ENV === 'test') {
  describe('/session', () => {
    describe('GET', () => {
      describe('with session', () => {
        let userID;
        let userPW;
        let socketID;

        let cookie;

        beforeEach(async () => {
          const userSchema = new User();
          userSchema.id = 'TEST_USER_ID';
          userSchema.pw = 'TEST_USER_PASSWORD';
          await userSchema.save();

          userID = 'TEST_USER_ID';
          userPW = 'TEST_USER_PASSWORD';
          socketID = 'TEST_SOCKET_ID';

          await request(app)
            .post('/session')
            .send({ userID, userPW, socketID })
            .expect(200)
            .then((res) => {
              cookie = res.header['set-cookie'][0];
            });
        });

        afterEach(async () => {
          await db.dropDatabase();
        });

        it('responds user', async () => {
          const res = await request(app).get('/session')
            .set('Cookie', cookie);
          const { user } = res.body;

          expect(user.id).toBe(userID);
          expect(res.status).toBe(200);
        });
      });

      describe('with no session', () => {
        it('responds validator error', async () => {
          const res = await request(app).get('/session');

          expect(res.status).toBe(400);
        });
      });

      describe('with server error', () => {
        let userID;
        let userPW;
        let socketID;

        let cookie;

        beforeEach(async () => {
          const userSchema = new User();
          userSchema.id = 'TEST_USER_ID';
          userSchema.pw = 'TEST_USER_PASSWORD';
          await userSchema.save();

          userID = 'TEST_USER_ID';
          userPW = 'TEST_USER_PASSWORD';
          socketID = 'TEST_SOCKET_ID';

          await request(app)
            .post('/session')
            .send({ userID, userPW, socketID })
            .expect(200)
            .then((res) => {
              cookie = res.header['set-cookie'][0];
            });

          userRepo.findBySession = jest.fn().mockRejectedValue('Test(server error)');
        });

        it('responds 500', async () => {
          const res = await request(app).get('/session')
            .set('Cookie', cookie);

          expect(res.status).toBe(500);
        });
      });
    });

    describe('POST', () => {
      describe('with vaild id & password', () => {
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

        afterEach(async () => {
          await db.dropDatabase();
        });

        it('responds user with session', async () => {
          const res = await request(app).post('/session')
            .send({ userID, userPW, socketID });
          const { user } = res.body;

          expect(user).toBeDefined();
          expect(res.header['set-cookie']).toBeDefined();
          expect(res.status).toBe(200);
        });
      });

      describe('with invalid id & password', () => {
        let userID;
        let userPW;
        let socketID;

        beforeEach(async () => {
          userID = 'TEST_USER_ID';
          userPW = 'INVALID_USER_PASSWORD';
          socketID = 'TEST_SOCKET_ID';

          const userSchema = new User();
          userSchema.id = 'TEST_USER_ID';
          userSchema.pw = 'TEST_USER_PASSWORD';
          await userSchema.save();
        });

        afterEach(async () => {
          await db.dropDatabase();
        });

        it('responds null and no session', async () => {
          const res = await request(app).post('/session')
            .send({ userID, userPW, socketID });

          expect(res.body.user).toBeNull();
          expect(res.header['set-cookie']).toBeUndefined();
          expect(res.status).toBe(400);
        });
      });

      describe('with server error', () => {
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

          userRepo.onlineStatus = jest.fn().mockRejectedValue('Test(server error)');
        });

        it('responds 500', async () => {
          const res = await request(app).post('/session')
            .send({ userID, userPW, socketID });

          expect(res.status).toBe(500);
        });
      });
    });

    describe('PATCH', () => {
      let userID;
      let userPW;
      let socketID;

      let cookie;

      beforeEach(async () => {
        const userSchema = new User();
        userSchema.id = 'TEST_ID';
        userSchema.pw = 'TEST_PASSWORD';
        await userSchema.save();

        userID = 'TEST_ID';
        userPW = 'TEST_PASSWORD';
        socketID = 'TEST_SOCKET_ID';

        await request(app)
          .post('/session')
          .send({ userID, userPW, socketID })
          .expect(200)
          .then((res) => {
            cookie = res.header['set-cookie'][0];
          });
      });

      afterEach(async () => {
        await db.dropDatabase();
      });

      it('makes session destroyed', async () => {
        const res = await request(app).patch('/session')
          .send({ userID });
        expect(res.body.user).toBeUndefined();
      });

      describe('with server error', () => {
        beforeEach(() => {
          userRepo.onlineStatus = jest.fn().mockRejectedValue('Test(server error)');
        });

        it('responds 500', async () => {
          const res = await request(app).patch('/session')
            .send({ userID });

          expect(res.status).toBe(500);
        });
      });
    });
  });
}
