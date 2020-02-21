const userStore = {
  users: [
    {
      id: 'a',
      pw: 'a',
      userName: '전우민',
      friends: ['ㅁ'],
    },
    {
      id: 'ㅁ',
      pw: 'ㅁ',
      userName: '김재원',
      friends: ['a','q'],
    },
    {
      id: 'q',
      pw: 'q',
      userName: '박지희',
      friends: ['ㅁ'],
    },
  ],
};

const getUsers = () => {
  return userStore;
};

// 회원가입
const addUser = (inputID, inputPW, inputName) => {
  userStore.users = [
    ...userStore.users,
    {
      id: inputID,
      pw: inputPW,
      userName: inputName,
      friends: [],
    },
  ]

  return userStore;
}

module.exports = {
  getUsers,
  addUser,
};
