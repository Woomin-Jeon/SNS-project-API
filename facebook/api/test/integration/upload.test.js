const request = require('supertest');
const app = require('../../index');
const method = require('../../utils/methods');

describe('/upload', () => {
  describe('POST', () => {
    beforeEach(() => {
      method.getKey = jest.fn().mockResolvedValue(999);
    });

    describe('with existent file', () => {
      it('responds json file', async () => {
        const res = await request(app).post('/upload')
          .set('Content-Type', 'multipart/form-data')
          .attach('file', '../FrontEnd/img/undefinedme.jpeg');

        expect(res.body).toBeDefined();
      });
    });
  });
});
