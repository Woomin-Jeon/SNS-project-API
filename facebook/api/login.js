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

const getInformaionByID = (userID) => {
  for (let i = 0; i < userStore.users.length; i++) {
    if (userID === userStore.users[i].id) {
      return [userStore.users[i].id, userStore.users[i].userName, userStore.users[i].friends];
    }
  }
}

const getUsers = () => {
  return userStore;
};

// 로그인
const performLogin = (userID, userPW) => {
  for (let i = 0; i < userStore.users.length; i += 1) {
    if (userID === userStore.users[i].id && userPW === userStore.users[i].pw) {
      return userStore.users[i];
    }
  }
  
  return 'fail';
}

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
  performLogin,
  getInformaionByID,
};
