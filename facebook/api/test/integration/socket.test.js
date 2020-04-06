const request = require('supertest');
const app = require('../../app');
const { socketIdStore } = require('../../utils/socket');

describe('/socket', () => {
  describe('GET (findByUserID)', () => {
    describe('with existent ID in socket ID store', () => {
      beforeEach(() => {
        socketIdStore.push({ id: 'testid', socket: 'SOCKET_ID' });
      });

      it('responds user socket ID', async () => {
        const res = await request(app).get('/socket/testid');

        const { userSocketID } = res.body;
        expect(userSocketID).toBe('SOCKET_ID');
      });
    });

    describe('with non-existent ID in socket ID store', () => {
      beforeEach(() => {
        socketIdStore.push({ id: 'testid', socket: 'SOCKET_ID' });
      });

      it('responds null', async () => {
        const res = await request(app).get('/socket/anotherid');

        const { userSocketID } = res.body;
        expect(userSocketID).toBeUndefined();
      });
    });
  });
});
