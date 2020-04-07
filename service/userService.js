require('express-async-errors');
const userRepo = require('../repository/user.repository');

const userService = {
  async getAllUsers() {
    return await userRepo.getAllUsers();
  },

  async signUp(userInformation) {
    return await userRepo.signUp(userInformation);
  },

  async uploadProfileImage(userID, filePath) {
    return await userRepo.uploadProfileImage(userID, filePath);
  },

  async findBySession(req) {
    return await userRepo.findBySession(req);
  },

  async getUserById(userID) {
    return await userRepo.getUserById(userID);
  },

  async onlineStatus(userID, bool) {
    return await userRepo.onlineStatus(userID, bool);
  },

  async addFriend(userID, friendID) {
    return await userRepo.addFriend(userID, friendID);
  },

  async removeFriend(userID, friendID) {
    return await userRepo.removeFriend(userID, friendID);
  }
};

module.exports = userService;
