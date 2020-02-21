const timeLinePosts = {
  post: [],
  scrap: [],
}

const getPosts = () => {
  return timeLinePosts;
};

// 게시글 추가
const addPost = (inputID, inputName, inputContents) => {
  const maxKey = timeLinePosts.post.length;

  timeLinePosts.post = [
    {
      uniqueKey: maxKey + 1,
      id: inputID, // 이 게시글을 누가 썼는지 식별
      name: inputName, // 이 게시글을 쓴 User의 이름
      contents: inputContents, // 게시글의 내용
      thumbCount: [], // 좋아요 개수. 배열의 길이를 반환하여 출력
      sharingCount: 0, // 공유 개수를 출력
      commentCount: 0, // 게시글에 달린 댓글 개수를 출력
      isEditButtonClicked: false, // 수정버튼이 눌렸는가?
    },
    ...timeLinePosts.post,
  ]

  return timeLinePosts;
};

// 게시글 삭제
const removePost = (specificPostUniqueKey) => {
  timeLinePosts.post = timeLinePosts.post.filter((post) =>
    post.uniqueKey != specificPostUniqueKey);
  
  return timeLinePosts;
};

// 게시글 수정
const editPost = (uniqueKey, temptState) => {
  timeLinePosts.post.forEach((post) => {
    post.uniqueKey != uniqueKey
    ? post
    : post.contents = temptState;
  });

  // timeLinePosts.post.forEach((post) => {
  //   post.uniqueKey != uniqueKey
  //   ? post
  //   : post.isEditButtonClicked = false;
  // });

  return timeLinePosts;
}

module.exports = {
  getPosts,
  addPost,
  removePost,
  editPost,
};
