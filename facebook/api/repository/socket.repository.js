const socketIdStore = [];

const SocketRepo = {
  registerSocket(userID, socketID) {
    socketIdStore.push({ id: userID, socket: socketID });
  },

  unregisterSocket(userID) {
    const index = socketIdStore.findIndex(({id}) => id === userID);
    socketIdStore.splice(index, 1);
  },

  findByUserID(userID) {
    const index = socketIdStore
      .findIndex(({id}) =>id === userID);

    if (index === -1) {
      return null;
    }

    return socketIdStore[index].socket;
  }
};

module.exports = SocketRepo;
