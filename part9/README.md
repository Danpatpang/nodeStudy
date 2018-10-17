# SNS 서비스

### 설치 모듈
+ `sequelize-cli`, `sequelize`, `mysql2` - DB 관련
+ `cookie-parser`, `express-session`, `dotnev` - 보안 관련
+ `nodemon` - 실행관련
+ `morgan`, `connect-flash` - 에러 관련

cookie-parser와 express-session에 들어가는 비밀키는 소스 코드 유출의 위험으로 직접 하드코딩하지 않는다.
대신`.env` 파일에 키-밸류 조합으로 정보를 모아두고
`dotnev` 패키지를 이용해서 서버 시작 시 process.env 객체에 넣을 수 있다.
쿠키뿐만 아니라 보안이 필요한 다양한 곳에 사용될 수 있다.
```javascript
// app.use(cookieParser('secret')과 동일

require('dotenv').config();
app.use(cookieParser(process.env.COOKIE_SECRET));
```

### layout 제작
```javascript
confirm("message");

// 현재 페이지 새로고침
location.reload();
```
```jade
// 현재 유저가 팔로우하는 사람 중에서 twit.user.id를 포함하는지 확인.
-const follow = user && user.Followings.map(f => f.id).includes(twit.user.id);

// 파일 업로드 시 사용 : "enctype=multipart/form-data"
form(action='/post' method='post' enctype="multipart/form-data")
    // 이미지 타입만 보여주기 'audio/*', 'video/*', 'image/*'
    input(type='file' accept='image/*')
```

##### @media
미디어 쿼리 문법.  
디바이스 종류에 따라 바뀌는 반응형 웹을 만들기 위해 사용.  
`@media screen and (min-width : 800px)` : 웹에 접근한 기기가 screen이고 가로가 800px 미만일 때 적용.

#### DB 세팅
MySQL, sequelize 사용.  
