const Key = require('../models/key');

const KeyRepo = {
  async getKey() {
    await Key.updateOne(
      { id: 'key' },
      { $inc: { key: +1 } },
    );
    return await Key.findOne({ id: 'key' });
  }
};

module.exports = KeyRepo;
