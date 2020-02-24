const timeLinePosts = {
  post: [],
  scrap: [],
}

const postComments = {
  comment: [],
};

let uniqueCount = 0;

// GET
const getPosts = () => {
  return timeLinePosts;
};

// 게시글 추가
const addPost = (inputID, inputName, inputContents) => {
  timeLinePosts.post = [
    {
      uniqueKey: uniqueCount++,
      id: inputID, // 이 게시글을 누가 썼는지 식별
      name: inputName, // 이 게시글을 쓴 User의 이름
      contents: inputContents, // 게시글의 내용
      thumbCount: [], // 좋아요 개수. 배열의 길이를 반환하여 출력
      sharingCount: 0, // 공유 개수를 출력
      commentCount: 0, // 게시글에 달린 댓글 개수를 출력
      isEditButtonClicked: false, // 수정버튼이 눌렸는가?
    },
    ...timeLinePosts.post,
  ];

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

  return timeLinePosts;
}

// 게시글 스크랩
const addScrap = (whoScrapedByID, whoScrapedByName, whoWritePostByName, ScrapedPostContents, uniqueKey) => {
  timeLinePosts.scrap = [
    {
      uniqueKey: uniqueCount++,
      id: whoScrapedByID, // 스크랩 한 사람의 ID
      whoDid: whoScrapedByName, // 스크랩 한 사람의 Name
      name: whoWritePostByName, // 스크랩 된 게시글을 쓴 User의 Name
      contents: ScrapedPostContents, // 스크랩 된 게시글의 내용
    },
    ...timeLinePosts.scrap,
  ];

  timeLinePosts.post.forEach((post) => {
    post.uniqueKey != uniqueKey
    ? post
    : post.sharingCount = post.sharingCount + 1;
  });

  return timeLinePosts;
}

// 댓글 추가
const addComment = (uniqueKey, currentUserID, currentUserName, commentContents) => {
  postComments.comment = [
    ...postComments.comment,
    {
      uniqueKey: uniqueCount++,
      id: uniqueKey, // 어떤 게시글에 달린 댓글인지 확인하기 위한 것
      writerID: currentUserID, // 댓글 쓰는 사람의 ID
      writer: currentUserName, // 댓글 쓰는 사람의 Name
      statement: commentContents, // 댓글의 내용
      childComment: [], // 대댓글이 담길 배열
      isChildCommentFunctionOn: false, // 대댓글 기능 On?
      commentThumbCount: [], // 좋아요 누른 사람의 ID가 담길 배열
    }
  ];

  return postComments;
};

// 댓글 추가시 댓글 개수 +1
const plusCommentCount = (uniqueKey) => {
  timeLinePosts.post.forEach((post) => {
    post.uniqueKey != uniqueKey
    ? post
    : post.commentCount = post.commentCount + 1;
  });
  
  return timeLinePosts;
};;

module.exports = {
  getPosts,
  addPost,
  removePost,
  editPost,
  addScrap,
  addComment,
  plusCommentCount,
};
