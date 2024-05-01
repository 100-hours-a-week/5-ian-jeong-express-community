# Community Service




__🛠️ Tech Stacks__

<img src="https://img.shields.io/badge/html5-E34F26?style=plastic&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/css3-1572B6?style=plastic&logo=css3&logoColor=white"> [![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=plastic&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
<img src="https://img.shields.io/badge/Node.js-339933?style=plastic&logo=Node.js&logoColor=white"/> [![Express](https://img.shields.io/badge/Express-000000?style=plastic&logo=express&logoColor=white)](https://expressjs.com/)

<br><br><br>

## 🚀 Getting Started

__1. git clone__
```bash
git clone https://github.com/BenchPress200/community-server-express.git
```

<br>

__2. vscode로 프로젝트 open__
- 하나의 창에 community-server-express/__frontend-server__
- 다른 하나의 창에 community-server-express/__backtend-server__


<br>

__3. package-lock.json 생성__

- 두 개의 vscode 창에서 각각 터미널을 열어서 npm install 명령으로 package-lock.json 생성

```bash
npm install
```

<br>

__4. globals.js 에서 프론트엔드 서버와 백엔드 서버의 IP 주소와 Port 번호 세팅__
```bash
📂 community-server-express/frontend-server/public/javascript/globals.js
📂 community-server-express/backend-server/globals.js
```
✅ 두 개의 globals.js를 똑같이 작성해야 함

<br>

__5. 서버 실행__
- front, back 각각 터미널에서 npm start를 통해 실행
```bash
npm start
```

<br>

__6. Welcome Page__
- globals.js에서 FRONTEND_IP_PORT에 할당했던 주소를 브라우저에서 주소창에 입력
```javascript
export const FRONTEND_PORT = 8080;
export const FRONTEND_IP_PORT = `http://localhost:${FRONTEND_PORT}`;
```
⬆️ 위 처럼 작성했다면 __http://localhost:8080__ 사용




<br><br><br>


## 💥 Features

- #### 회원가입

- #### 로그인

- #### 게시글 작성

- #### 게시글 조회

- #### 게시글 수정

- #### 게시글 삭제

- #### 댓글 작성

- #### 댓글 조회

- #### 댓글 수정

- #### 댓글 삭제

- #### 유저 정보 조회 및 수정

- #### 유저 정보 삭제



<br><br><br>

## 🏯 Architecture


아케텍쳐 도식화
인증, 인가 방식
초기데이터 세팅 
라우트 모델 컨트롤러
DB사용 X 제이슨 파일로 데이터 관리













<br><br><br>

##  🎯 Troubleshooting

- [x] ~~클릭 요소들에 대한 마우스 포인터 변경~~
- [x] ~~버튼들 모두 호버 추가~~
- [x] ~~비밀번호 입력과 비밀번호 확인 입력 중 하나만 입력했을 때 적절한 헬퍼텍스트로 수정~~
- [x] ~~form 제출을 통한 이미지 저장에서 파일 경로가 아닌 data-url로 저장~~
- [x] ~~로그인 버튼을 통해 로그인 완료 후, 해당 버튼이 계속 클릭되는 이슈~~
- [x] ~~헬퍼텍스트로 인해 폼 요소 밀리는 이슈~~
- [x] ~~각종 유효성 검사를 아웃포커싱이 아닌 즉시 입력을 판단으로 유효성 검사 진행~~
- [x] ~~회원가입 페이지 헬퍼텍스트 오타 이슈~~



