const socketFunc = require('../../utils/socket');

describe('socketFunc', () => {
  let id;
  let socket;

  beforeEach(() => {
    id = 'TEST_ID';
    socket = 'SOCKET_ID';
  });

  describe('registerSocket', () => {
    describe('with \'socket ID\' from \'user ID\' is correct', () => {
      it('returns socket ID', () => {
        socketFunc.registerSocket(id, socket);
        const validation = socketFunc.findByUserID(id);
        expect(validation).toBe(socket);
      });
    });
  });

  describe('unregisterSocket', () => {
    describe('with \'socket ID\' from \'user ID\' is null', () => {
      it('returns null', () => {
        socketFunc.unregisterSocket(id);
        const validation = socketFunc.findByUserID(id);
        expect(validation).toBe(null);
      });
    });
  });
});
