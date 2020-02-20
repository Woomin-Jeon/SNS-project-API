const userStore = {
  users: [],
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
