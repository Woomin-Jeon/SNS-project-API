const userStore = {
  users: [
    {
      id: 'a',
      pw: 'a',
      userName: '전우민',
      friends: ['d'],
    },
    {
      id: 'd',
      pw: 'd',
      userName: '김병찬',
      friends: ['a','q','w'],
    },
    {
      id: 'q',
      pw: 'q',
      userName: '김대희',
      friends: ['d','w'],
    },
    {
      id: 'w',
      pw: 'w',
      userName: '김민성',
      friends: ['d'],
    },
  ],
};

// ID를 이용하여 다른 정보 얻기
const getUserByID = (userID) => {
  return userStore.users.find(({id}) => id === userID);
};

// 유저 목록 GET
const getUsers = () => {
  return userStore;
};

// 로그인
const login = (userID, userPW) => getUserByID(userID);

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
  ];

  return userStore;
};

// 친구 추가
const addFriend = (currentUserID ,friendID) => {
  let index = userStore.users
    .findIndex(user => user.id === currentUserID);

  userStore.users[index].friends =
    [...userStore.users[index].friends, friendID];

  return userStore;
};

// 친구 해제
const removeFriend = (currentUserID, friendID) => {
  let index = userStore.users
    .findIndex(user => user.id === currentUserID);

  userStore.users[index].friends =
    userStore.users[index].friends.filter((v) => v !== friendID);

  return userStore;
};

module.exports = {
  getUsers,
  addUser,
  addFriend,
  removeFriend,
  login,
  getUserByID,
};
