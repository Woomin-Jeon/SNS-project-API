const request = require('supertest');
const app = require('../../index');
const db = require('../../models/index');

describe('/profile', () => {
  describe('PATCH (uploadProfileImage)', () => {
    let userId;
    let filePath;

    beforeEach(() => {
      userId = 'TEST_USER_ID';
      filePath = 'TEST_FILE_PATH';
    });

    afterEach(async () => {
      await db.dropDatabase();
    });

    it('responds 200', async () => {
      const res = await request(app).patch('/profile')
        .send({ userId, filePath });

      expect(res.status).toBe(200);
    });
  });
});
