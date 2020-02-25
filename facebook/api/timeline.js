const timeLinePosts = {
  post: [
    {
      uniqueKey: 100,
      id: 'a',
      name: '전우민',
      contents: '오늘은 날씨가 정말 맑아서 기분이 상쾌하다',
      thumbCount: [],
      sharingCount: 0, 
      commentCount: 0,
      isEditButtonClicked: false,
    },
    {
      uniqueKey: 101,
      id: 'q',
      name: '김대희',
      contents: '아 오늘 아침을 너무 조금 먹었더니 배고파',
      thumbCount: [],
      sharingCount: 0, 
      commentCount: 0,
      isEditButtonClicked: false,
    },
    {
      uniqueKey: 102,
      id: 'ㅁ',
      name: '김병찬',
      contents: '아니 오늘 날씨 진짜 너무 추운거 아님?',
      thumbCount: [],
      sharingCount: 0, 
      commentCount: 0,
      isEditButtonClicked: false,
    },
    {
      uniqueKey: 103,
      id: 'w',
      name: '김민성',
      contents: '벌써 20시 18분 이구나',
      thumbCount: [],
      sharingCount: 0, 
      commentCount: 0,
      isEditButtonClicked: false,
    },
  ],
  scrap: [],
}

const postComments = {
  comment: [],
};

let uniqueCount = 0;

// GET Posts
const getPosts = () => timeLinePosts;

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
const editPost = (uniqueKey, updatedContents) => {
  timeLinePosts.post.forEach((post) => {
    post.uniqueKey != uniqueKey
    ? post
    : post.contents = updatedContents;
  });

  return timeLinePosts;
}

// 게시글 좋아요
const plusThumbCount = (uniqueKey, currentUserID) => {
  timeLinePosts.post.forEach((post) => {
    post.uniqueKey != uniqueKey
    ? post
    : post.thumbCount.includes(currentUserID)
      ? post.thumbCount = post.thumbCount.filter((v) => v != currentUserID)
      : post.thumbCount = [...post.thumbCount, currentUserID];
  });

  return timeLinePosts;
};

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

// GET Comments
const getComments = () => postComments;

// 댓글 추가
const addComment = (uniqueKey, currentUserID, currentUserName, commentContents) => {
  postComments.comment = [
    {
      uniqueKey: uniqueCount++,
      id: uniqueKey, // 어떤 게시글에 달린 댓글인지 확인하기 위한 것
      writerID: currentUserID, // 댓글 쓰는 사람의 ID // owner
      writer: currentUserName, // 댓글 쓰는 사람의 Name
      statement: commentContents, // 댓글의 내용
      childComment: [], // 대댓글이 담길 배열
      isChildCommentFunctionOn: false, // 대댓글 창 Open?
      commentThumbCount: [], // 좋아요 누른 사람의 ID가 담길 배열
    },
    ...postComments.comment,
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
};

// 댓글 좋아요
const plusCommentThumbCount = (uniqueKey, currentUserID) => {
  postComments.comment.forEach((comment) => {
    comment.uniqueKey != uniqueKey
    ? comment
    : comment.commentThumbCount.includes(currentUserID)
      ? comment.commentThumbCount = comment.commentThumbCount.filter((v) => v != currentUserID)
      : comment.commentThumbCount = [...comment.commentThumbCount, currentUserID];
  });

  return postComments;
};

// 대댓글 추가
const addChildComment = (uniqueKey, contents, currentUserID, currentUserName) => {
  postComments.comment.forEach((comment) => {
    comment.uniqueKey != uniqueKey
    ? comment
    : comment.childComment = [
      {
        id: currentUserID,
        name: currentUserName,
        statement: contents,
      },
      ...comment.childComment,
    ];
  });

  return postComments;
};

module.exports = {
  getPosts,
  addPost,
  removePost,
  editPost,
  plusThumbCount,
  addScrap,
  getComments,
  addComment,
  plusCommentCount,
  plusCommentThumbCount,
  addChildComment,
};
