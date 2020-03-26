const UserRepo = require('../../repository/user.repository');
const User = require('../../models/user');

describe('UserRepo', () => {
  let validUser;

  let req;

  let id;
  let pw;
  let userName;
  let birth;
  let location;
  let email;
  let profile;

  beforeEach(() => {
    validUser = {
      id: 'TEST_USER_ID',
      pw: 'TEST_USER_PASSWORD',
      userName: 'TESTER',
      birth: '1996-04-21',
      location: 'SEOUL_KOREA',
      email: 'test@email.com',
      profile: 'TEST_PROFILE_FILE_PATH',
      friends: [],
      online: false,
    };
  });

  describe('getAllUsers', () => {
    beforeEach(() => {
      User.find = jest.fn().mockResolvedValue([{
        id: 'TEST_USER_ID',
        pw: 'TEST_USER_PASSWORD',
        userName: 'TESTER',
        birth: '1996-04-21',
        location: 'SEOUL_KOREA',
        email: 'test@email.com',
        profile: 'TEST_PROFILE_FILE_PATH',
        friends: [],
        online: false,
      }, { example: 'user 1'}, { example: 'user 2' }, { example: 'etc...'}]);
    });

    it('returns users', async () => {
      const users = await UserRepo.getAllUsers();
      expect(users.length).toBe(4);
    });
  });

  describe('signUp', () => {
    describe('with all arguments', () => {
      beforeEach(() => {
        id = 'TEST_USER_ID';
        pw = 'TEST_USER_PASSWORD';
        userName = 'TESTER';
        birth = '1996-04-21';
        location = 'SEOUL_KOREA';
        email = 'test@email.com';
        profile = 'TEST_PROFILE_FILE_PATH';

        User.create = jest.fn().mockResolvedValue(validUser);
      });

      it('returns new user', async () => {
        const user = await UserRepo.signUp(id, pw, userName, birth, location, email, profile);
        expect(user).toEqual(validUser);
      });
    });

    describe('with insufficient arguments', () => {
      beforeEach(() => {
        id;
        pw = 'TEST_USER_PASSWORD';
        userName = 'TESTER';
        birth;
        location = 'SEOUL_KOREA';
        email = 'test@email.com';
        profile = 'TEST_PROFILE_FILE_PATH';

        User.create = jest.fn().mockResolvedValue({
          id: null,
          pw: 'TEST_USER_PASSWORD',
          userName: 'TESTER',
          birth: null,
          location: 'SEOUL_KOREA',
          email: 'test@email.com',
          profile: 'TEST_PROFILE_FILE_PATH',
          friends: [],
        });
      });

      it('returns error', async () => {
        const user = await UserRepo.signUp();
        const validation = user === validUser ? 'correct' : 'error';
        expect(validation).toBe('error');
      })
    });
  });

  describe('uploadProfileImage', () => {
    beforeEach(() => {
      req = {
        body: {
          userId: 'TEST_USER_ID',
          filePath: 'TEST_PROFILE_PATH',
        }
      };

      User.updateOne = jest.fn().mockResolvedValue({
        profile: 'TEST_PROFILE_PATH',
      });
    });

    it('returns uploaded profile path', async () => {
      const user = await UserRepo.uploadProfileImage(req);
      expect(user.profile).toBe(req.body.filePath);
    });
  });

  describe('findBySession', () => {
    beforeEach(() => {
      req = {
        session: {
          userID: 'TEST_SESSION_ID'
        }
      };
    });

    describe('with matched session ID', () => {
      beforeEach(() => {
        User.findById = jest.fn().mockResolvedValue(validUser);
      });

      it('returns user matching session ID', async () => {
        const user = await UserRepo.findBySession(req);
        expect(user).toBe(validUser);
      });
    });

    describe('with unmatched session ID', () => {
      beforeEach(() => {
        User.findById = jest.fn().mockResolvedValue(null);
      });

      it('returns null', async () => {
        const user = await UserRepo.findBySession(req);
        expect(user).toBe(null);
      });
    });
  });

  describe('getUserById', () => {

    describe('with matched user ID', () => {
      beforeEach(() => {
        id = 'TEST_USER_ID';

        User.findOne = jest.fn().mockResolvedValue(validUser);
      });

      it('returns user matching user ID', async () => {
        const user = await UserRepo.getUserById(id);
        expect(user).toBe(validUser);
      });
    });

    describe('with unmatched user ID', () => {
      beforeEach(() => {
        id = 'non-existent ID';

        User.findOne = jest.fn().mockResolvedValue(null);
      });

      it('returns null', async () => {
        const user = await UserRepo.getUserById(id);
        expect(user).toBe(null);
      });
    });
  });

  describe('onlineStatus', () => {
    describe('with online', () => {
      beforeEach(() => {
        User.updateOne = jest.fn().mockResolvedValue({
          online: true,
        })
      });

      it('returns true', async () => {
        const user = await UserRepo.onlineStatus(id, true);
        expect(user.online).toBe(true);
      });
    });

    describe('with offline', () => {
      beforeEach(() => {
        User.updateOne = jest.fn().mockResolvedValue({
          online: false,
        })
      });

      it('returns false', async () => {
        const user = await UserRepo.onlineStatus(id, false);
        expect(user.online).toBe(false);
      });
    });
  });

  describe('addFriend', () => {
    let friendID;

    beforeEach(() => {
      friendID = 'ADDED_FRIEND';

      User.updateOne = jest.fn().mockResolvedValue({
        friends: [friendID],
      });
    });

    it('returns friend', async () => {
      const user = await UserRepo.addFriend(id, friendID);
      expect(user.friends.length).toBe(1);
    });
  });

  describe('removeFriend', () => {
    let friendID;
    let friends;
    beforeEach(() => {
      friendID = 'REMOVED_FRIEND';
      friends = ['friend 1', 'friend 2', 'friend 3'];

      User.updateOne = jest.fn().mockResolvedValue({
        friends: ['friend 1', 'friend 2'],
      })
    });

    it('returns friends.length -1', async () => {
      const user = await UserRepo.removeFriend(id, friendID);
      expect(user.friends.length).toBe(friends.length -1);
    });
  });
});





















