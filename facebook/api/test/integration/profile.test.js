const request = require('supertest');
const app = require('../../index');
const UserRepo = require('../../repository/user.repository');
const { testUserSchema } = require('../../models/x_test');

describe('/profile', () => {
  describe('PATCH', () => {
    let User;
    let userId;
    let filePath;

    beforeEach(async () => {
      User = new testUserSchema();
      User.id = 'TEST_ID';
      User.profile = 'PROFILE_TEST_FILE_PATH';
      await User.save();

      userId = 'TEST_ID';
      filePath = 'UPDATED_FILE_PATH';

      UserRepo.uploadProfileImage = jest.fn().mockImplementation(
        () => testUserSchema.updateOne(
          { id: userId },
          { $set: { profile: filePath }}
        )
      );

      UserRepo.getAllUsers = jest.fn().mockImplementation(
        () => testUserSchema.find()
      );
    });

    it('updates the profile image', async () => {
      const res =  await request(app).patch('/profile');
      const { userStore } = res.body;

      expect(res.status).toBe(200);
      expect(userStore[0].profile).toBe('UPDATED_FILE_PATH');
    });

    afterEach(() => {
      testUserSchema.collection.drop();
    });
  });
});
