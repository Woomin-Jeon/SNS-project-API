const UserRepo = require('../../repository/user.repository');
const User = require('../../models/user');
const { userId, filePath } = require('../../repository/user.repository');

describe('UserRepo', () => {
  let userData;

  describe('signUp', () => {
    describe('with user created', () => {
      beforeEach(() => {
        User.create = jest.fn().mockResolvedValue(userData = 'TEST_USER');
      });

      it('returns defined', async () => {
        const user = await UserRepo.signUp();
        expect(user).toBe('TEST_USER');
      });
    });
  });

  describe('getAllUsers', () => {
    describe('with user exist', () => {
      beforeEach(() => {
        User.find = jest.fn().mockResolvedValue(userData);
      });

      it('returns defined', async () => {
        const users = await UserRepo.getAllUsers();
        expect(users).toBeDefined();
      });
    });
  });

  describe('uploadProfileImage, onlineStatus, addFriend, removeFriend', () => {
    let req;
    beforeEach(() => {
      User.updateOne = jest.fn().mockResolvedValue(userData = 'TEST_USER_UPDATED');
      req = { body: { userId: 'TEST_ID', filePath: 'TEST_FILE_PATH'} }
    });

    describe('with profile image is uploaded', () => {
      it('returns "TEST_USER_UPDATED"', async () => {
        const user1 = await UserRepo.uploadProfileImage(req);
        const user2 = await UserRepo.onlineStatus();
        const user3 = await UserRepo.addFriend();
        const user4 = await UserRepo.removeFrined();
        expect(user1).toBe('TEST_USER_UPDATED');
        expect(user2).toBe('TEST_USER_UPDATED');
        expect(user3).toBe('TEST_USER_UPDATED');
        expect(user4).toBe('TEST_USER_UPDATED');
      })
    })
  });

  describe('findBySession', () => {
    describe('with user exist', () => {
      let req;
      beforeEach(() => {
        User.findById = jest.fn().mockResolvedValue(userData);
        req = { session: { userID: 'SESSION_USER_ID' } };
      });

      it('returns defined', async () => {
        const user = await UserRepo.findBySession(req);
        expect(user).toBeDefined();
      });
    });
  });

  describe('getUserByID', () => {
    describe('with user exist', () => {
      beforeEach(() => {
        User.findOne = jest.fn().mockResolvedValue(userData);
      });

      it('returns defined', async () => {
        const user = await UserRepo.getUserById();
        expect(user).toBeDefined();
      });
    });
  });
});
