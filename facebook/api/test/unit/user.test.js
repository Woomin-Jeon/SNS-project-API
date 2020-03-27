const userService = require('../../service/userService');
const userRepo = require('../../repository/user.repository');

describe('userService', () => {
  let validUser;
  let req;

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
      userRepo.getAllUsers = jest.fn().mockResolvedValue([{
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
      const users = await userService.getAllUsers();

      expect(users).toHaveLength(4);
    });
  });

  describe('signUp', () => {
    let id;
    let pw;
    let userName;
    let birth;
    let location;
    let email;
    let profile;

    beforeEach(() => {
      id = 'TEST_USER_ID';
      pw = 'TEST_USER_PASSWORD';
      userName = 'TESTER';
      birth = '1996-04-21';
      location = 'SEOUL_KOREA';
      email = 'test@email.com';
      profile = 'TEST_PROFILE_FILE_PATH';

      userRepo.signUp = jest.fn().mockResolvedValue(validUser);
    });

    it('returns new user', async () => {
      const userInformation = { id, pw, userName, birth, location, email, profile };
      const user = await userService.signUp(userInformation);

      expect(user).toEqual(validUser);
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

      userRepo.uploadProfileImage = jest.fn().mockResolvedValue({
        profile: 'TEST_PROFILE_PATH',
      });
    });

    it('returns uploaded profile path', async () => {
      const user = await userService.uploadProfileImage(req);

      expect(user.profile).toEqual(req.body.filePath);
    });
  });

  describe('findBySession', () => {
    beforeEach(() => {
      req = {
        session: {
          userID: 'TEST_SESSION_ID'
        }
      };

      userRepo.findBySession = jest.fn().mockResolvedValue(validUser);
    });

    it('returns user matching session ID', async () => {
      const user = await userService.findBySession(req);

      expect(user).toEqual(validUser);
    });
  });

  describe('getUserById', () => {
    let id;

    beforeEach(() => {
      id = 'TEST_USER_ID';

      userRepo.getUserById = jest.fn().mockResolvedValue(validUser);
    });

    it('returns user matching user ID', async () => {
      const user = await userService.getUserById(id);
      expect(user).toEqual(validUser);
    });
  });

  describe('onlineStatus', () => {
    let id;

    describe('with online', () => {
      beforeEach(() => {
        userRepo.onlineStatus = jest.fn().mockResolvedValue({
          online: true,
        })
      });

      it('returns true', async () => {
        const user = await userService.onlineStatus(id, true);

        expect(user.online).toBeTruthy();
      });
    });

    describe('with offline', () => {
      let id;

      beforeEach(() => {
        userRepo.onlineStatus = jest.fn().mockResolvedValue({
          online: false,
        })
      });

      it('returns false', async () => {
        const user = await userService.onlineStatus(id, false);

        expect(user.online).toBeFalsy();
      });
    });
  });

  describe('addFriend', () => {
    let id;
    let friendID;

    beforeEach(() => {
      friendID = 'ADDED_FRIEND';

      userRepo.addFriend = jest.fn().mockResolvedValue({
        friends: [friendID],
      });
    });

    it('returns friend', async () => {
      const user = await userService.addFriend(id, friendID);

      expect(user.friends).toHaveLength(1);
    });
  });

  describe('removeFriend', () => {
    let id;
    let friendID;
    let friends;

    beforeEach(() => {
      friendID = 'REMOVED_FRIEND';
      friends = ['friend 1', 'friend 2', 'friend 3'];

      userRepo.removeFriend = jest.fn().mockResolvedValue({
        friends: ['friend 1', 'friend 2'],
      })
    });

    it('returns friends.length -1', async () => {
      const user = await userService.removeFriend(id, friendID);

      expect(user.friends).toHaveLength(2);
    });
  });
});



