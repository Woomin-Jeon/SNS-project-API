const UserRepo = require('../repository/user.repository');

const UserService = {
  async getAllUsers() {
    return await UserRepo.getAllUsers();
  },

  async signUp(id, pw, userName, birth, location, email, profile) {
    return await UserRepo.signUp(id, pw, userName, birth, location, email, profile);
  },

  async uploadProfileImage(userID, filePath) {
    return await UserRepo.uploadProfileImage(userID, filePath);
  },

  async findBySession(req) {
    return await UserRepo.findBySession(req);
  },

  async getUserById(userID) {
    return await UserRepo.getUserById(userID);
  },

  async onlineStatus(userID, bool) {
    return await UserRepo.onlineStatus(userID, bool);
  },

  async addFriend(userID, friendID) {
    return await UserRepo.addFriend(userID, friendID);
  },

  async removeFriend(userID, friendID) {
    return await UserRepo.removeFriend(userID, friendID);
  }
};

module.exports = UserService;
