# Facebook API

웹 사이트 URL : http://woomin-facebook.com
테스트 유저 ⇒ 아이디: test / 비밀번호: test

<br />

## 프로젝트 소개

2020.02.02 ~ 2020.04.21  
Facebook을 클론 코딩하면서 JavaScript 와 React, Express(NodeJS), HTTP 와 Web 전반에 대해서 학습한 프로젝트입니다. 전반적인 웹 애플리케이션의 개발 과정을 습득하고, Docker 와 클라우드를 이용한 배포 과정도 체험했습니다. 또한 API Test coverage 100% 를 달성하는 과정에서 책에서 봤던 설계의 중요성을 몸소 느낀 프로젝트입니다.

<br />

## 프로젝트 실행 방법

FrontEnd ([README Here](https://github.com/Woomin-Jeon/facebook-clone-client))

```javascript
$ git clone git@github.com:Woomin-Jeon/facebook-clone-client.git
$ npm install
$ npm start
```

Api

```javascript
$ git clone git@github.com:Woomin-Jeon/facebook-clone-server.git
$ npm install
$ npm start
```

<br />

## 테스트

```javascript
$ npm run unit : Unit Test
$ npm run integration : Integration Test
```

<img src="./img/testcoverage100.png" />

<br />
<br />

## 프로젝트 서비스 구성도

<img src="./img/아키텍처.png" />

<br />
<br />

## 구현 API

| **About User** |                   |
| -------------- | ----------------- |
| GET /session   | 세션 확인         |
| POST /session  | 로그인            |
| PATCH /session | 로그아웃          |
| GET /socket    | 소켓ID 불러오기   |
| GET /login     | 유저정보 불러오기 |
| POST /login    | 회원가입          |
| PATCH /profile | 프로필 사진 추가  |
| POST /friends  | 친구 추가 하기    |
| PATCH /friends | 친구 제거 하기    |

<br />

| **About Post** |                   |
| -------------- | ----------------- |
| GET /posts     | 게시글 불러오기   |
| PATCH /posts   | 게시글 수정       |
| POST /posts    | 게시글 추가       |
| DELETE /posts  | 게시글 삭제       |
| PATCH /like    | 게시글에 좋아요   |
| POST /upload   | 사진 업로드       |

<br />

| **About Comment**  |                |
| ------------------ | -------------- |
| GET /comments      | 댓글 불러오기  |
| POST /comments     | 댓글 달기      |
| PATCH /comments    | 댓글 개수 +1   |
| POST /childcomment | 대댓글 달기    |
| PATCH /commentlike | 댓글에 좋아요  |
