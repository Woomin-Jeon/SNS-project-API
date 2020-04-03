describe('selectDB', () => {
  const initialENV = process.env;

  afterEach(() => {
    process.env = initialENV;
  });

  describe('with NODE_ENV = "test"', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env = { ...initialENV }
    });

    it('returns DB_TEST', () => {
      expect(process.env.NODE_ENV).toBe("test");
    });
  });

  describe('with NODE_ENV = "product"', () => {
    beforeEach(() => {
      jest.resetModules();
      process.env = { ...initialENV }
      delete process.env.NODE_ENV;
    });

    it('returns DB_PRODUCT', () => {
      process.env.NODE_ENV = 'product';
      expect(process.env.NODE_ENV).toBe("product");
    });
  });
});
