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
      userName: '김병찬',
      friends: ['a','q','w'],
    },
    {
      id: 'q',
      pw: 'q',
      userName: '김대희',
      friends: ['ㅁ','w'],
    },
    {
      id: 'w',
      pw: 'w',
      userName: '김민성',
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
    userStore.users[index].friends.filter((v) => v != friendID);

  return userStore;
};

module.exports = {
  getUsers,
  addUser,
  addFriend,
  removeFriend,
};
