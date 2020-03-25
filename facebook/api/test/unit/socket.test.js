const SocketFunc = require('../../function/socket');

describe('SocketFunc', () => {
  let id;
  let socket;

  beforeEach(() => {
    id = 'TEST_ID';
    socket = 'SOCKET_ID';
  });

  describe('registerSocket', () => {
    describe('with \'socket ID\' from \'user ID\' is correct', () => {
      it('returns socket ID', () => {
        SocketFunc.registerSocket(id, socket);
        const validation = SocketFunc.findByUserID(id);
        expect(validation).toBe(socket);
      });
    });
  });

  describe('unregisterSocket', () => {
    describe('with \'socket ID\' from \'user ID\' is null', () => {
      it('returns null', () => {
        SocketFunc.unregisterSocket(id);
        const validation = SocketFunc.findByUserID(id);
        expect(validation).toBe(null);
      });
    });
  });
});
