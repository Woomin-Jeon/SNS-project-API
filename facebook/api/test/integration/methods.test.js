const db = require('../../models/index');
const methods = require('../../utils/methods');
const Key = require('../../models/key');

describe('methods', () => {
  describe('getKey', () => {
    beforeEach(async () => {
      const keySchema = new Key();
      keySchema.key = 10;
      await keySchema.save();
    });

    afterEach(async () => {
      await db.dropDatabase();
    });

    it('returns key', async () => {
      const key = await methods.getKey();

      expect(key).toBe(10);
    });
  });
});
