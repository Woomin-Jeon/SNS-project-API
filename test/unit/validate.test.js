const { validatePost } = require('../../models/post');
const { validateUser } = require('../../models/user');

describe('vaildate features', () => {
  describe('validatePost', () => {
    describe('with valid arguments', () => {
      let id;
      let name;
      let contents;
      let profile;

      beforeEach(() => {
        id = 'TEST_ID';
        name = 'TEST_NAME';
        contents = 'TEST_CONTENTS';
        profile = 'TEST_PROFILE';
      });

      it('returns null', () => {
        const postInformation = { body : { id, name, contents, profile } }
        const validation = validatePost(postInformation);

        expect(validation.error).toBeNull();
      });
    });

    describe('with invalid arguments', () => {
      let id;
      let name;
      let contents;
      let profile;

      beforeEach(() => {
        id;
        name = 'TEST_NAME';
        contents;
        profile = 'TEST_PROFILE';
      });

      it('returns error', () => {
        const postInformation = { body : { id, name, contents, profile } }
        const validation = validatePost(postInformation);

        expect(validation.error).toBeDefined();
      });
    });
  });

  describe('validateUser', () => {
    describe('with valid arguments', () => {
      let id;
      let pw;
      let userName;
      let birth;
      let location;
      let email;
      let profile;

      beforeEach(() => {
        id = 'TEST_ID';
        pw = 'TEST_PASSPWORD';
        userName = 'TEST_NAME';
        birth = '1996-04-21';
        location = 'SEOUL_KOREA';
        email = 'test@email.com';
        profile = 'TEST_PROFILE_PATH';
      });

      it('returns true', () => {
        const userInformation = { body : { id, pw, userName, birth, location, email, profile }};
        const validation = validateUser(userInformation);

        expect(validation.error).toBeNull();
      });
    });

    describe('with invalid arguments', () => {
      let id;
      let pw;
      let userName;
      let birth;
      let location;
      let email;
      let profile;

      beforeEach(() => {
        id;
        pw = 'TEST_PASSPWORD';
        userName = 'TEST_NAME';
        birth;
        location = 'SEOUL_KOREA';
        email = 'test@email.com';
        profile;
      });

      it('returns false', () => {
        const userInformation = { body : { id, pw, userName, birth, location, email, profile } };
        const validation = validateUser(userInformation);

        expect(validation.error).toBeDefined();
      });
    });
  });
});
