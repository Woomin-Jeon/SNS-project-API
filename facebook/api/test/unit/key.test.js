const KeyRepo = require('../../repository/key.repository');
const Key = require('../../models/key');

describe('KeyRepo', () => {
  beforeEach(() => {
    Key.updateOne = jest.fn().mockResolvedValue(true);
    Key.findOne = jest.fn().mockResolvedValue('TEST_KEY');
  });
  
  describe('getKey', () => {
    describe('with success getting key', () => {
      it('returns defined', async () => {
        const key = await KeyRepo.getKey();
        expect(key).toBeDefined();
      });
    });
  });
});
