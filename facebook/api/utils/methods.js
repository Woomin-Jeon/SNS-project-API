const Key = require('../models/key');

const methods = {
  checkPassword(user, pw) {
    return user.pw === pw;
  },

  async getKey() {
    await Key.updateOne(
      { id: 'key' },
      { $inc: { key: +1 } },
    );
    const key = await Key.findOne({ id: 'key' });

    return key.key;
  },
};

module.exports = methods;
