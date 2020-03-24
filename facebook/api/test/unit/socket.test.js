const SocketRepo = require('../../repository/socket.repository');

describe('SocketRepo', () => {
  let id;
  let socket;

  beforeEach(() => {
    id = 'TEST_ID';
    socket = 'SOCKET_ID';
  });

  describe('registerSocket', () => {
    describe('with \'socket ID\' from \'user ID\' is correct', () => {
      it('returns socket ID', () => {
        SocketRepo.registerSocket(id, socket);
        const validation = SocketRepo.findByUserID(id);
        expect(validation).toBe(socket);
      });
    });
  });

  describe('unregisterSocket', () => {
    describe('with \'socket ID\' from \'user ID\' is null', () => {
      it('returns null', () => {
        SocketRepo.unregisterSocket(id);
        const validation = SocketRepo.findByUserID(id);
        expect(validation).toBe(null);
      });
    });
  });
});
