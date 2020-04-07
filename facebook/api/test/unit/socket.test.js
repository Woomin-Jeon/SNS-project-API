const { socket, socketIdStore } = require('../../socketio/socket');

describe('socketFunc', () => {
  let existentID;
  let socketID;
  let nonExistentID;

  beforeEach(() => {
    existentID = 'TEST_ID';
    socketID = 'SOCKET_ID';
    nonExistentID = 'WHATEVER';
  });

  describe('registerSocket', () => {
    it('add socket ID to socketIdStore', () => {
      socket.registerSocket(existentID, socketID);

      expect(socketIdStore).toHaveLength(1);
    });
  });

  describe('findByUserID', () => {
    describe('with existent user ID', () => {
      it('returns socket ID that matches the user ID', () => {
        const socketID = socket.findByUserID(existentID);

        expect(socketID).toBe('SOCKET_ID');
      });
    });

    describe('with non-existent user ID', () => {
      it('returns null', () => {
        const socketID = socket.findByUserID(nonExistentID);

        expect(socketID).toBeNull();
      });
    });
  });

  describe('unregisterSocket', () => {
    it('remove socket ID from socketIdStore', () => {
      socket.unregisterSocket(existentID);

      expect(socketIdStore).toHaveLength(0);
    });
  });
});
