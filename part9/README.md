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

### DB 세팅
MySQL, sequelize 사용.  
테이블 정의 : `sequelize.define('DB이름', {테이블 속성}, {timestamps: true, paranoid: ture})`
> timestamps가 true일 경우 createdAt, deletedAt 자동 컬럼 생성.  
> paranoid가 true일 경우 updatedAt 자동 컬럼 생성.

#### 연결
```javascript
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = require('./user')(sequelize, Sequelize);
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

db.User.hasMany(db.Post);
// 자동으로 post 테이블에 userId 컬럼 추가
db.Post.belongsTo(db.User);

// PostHashtag라는 관계 테이블이 생성(컬럼 : postId, hashtagId)되고 Post와 Hashtag M:N 관계로 연결
// get, add 메서드가 각 모델에 자동 추가
db.Post.belongsToMany(db.Hashtag, {through : 'PostHashtag'});
db.Hashtag.belongsToMany(db.Post, {through : 'PostHashtag'});

// 자기 자신과 연결
db.User.belongsToMany(db.User, {
    foreignKey: 'followingId',
    as : 'Followers',
    through : 'Follow'
});
db.User.belongsToMany(db.User, {
    foreignKey: 'followerId',
    as : 'Followings',
    through : 'Follow'
});

module.exports = db;
```

1. 1:N 관계는 hasMany, belongsTo로 연결할 수 있다.
2. M:N 관계는 belongsToMany로 연결되며 연결을 위한 중간 관계 테이블이 생성된다.
3. 같은 테이블끼리 관계를 맺을 때는 모델 이름과 컬럼 이름을 따로 정해줘야 한다.
4. as는 JOIN 작업 시 사용하는 이름이다.

#### 데이터베이스 생성
`sequelize db:create` : 데이터베이스가 없을 경우 생성.  
`sequelize.sync()` : 데이터베이스를 동기화.

> 서버가 실행되면 시퀄라이즈는 테이블 생성 쿼리문 실행.

### Passport
회원가입과 로그인은 직접 구현할 수도 있지만, 세션, 쿠키 처리 등 복잡한 작업이 많다.
이를 Passport 모듈을 사용하여 관리할 수 있다.  
`npm i passport passport-local, passport-kakao, bcrypt`  
`passport-local` : 로컬 로그인 구현을 위해 필요.  
`passport-kakao` : 카카오 로그인 구현을 위해 필요.  
`passport-bcrypt` : 비밀번호 암호화를 위해 필요.  

#### app.js
```javascript
const passport = require('passport');
const passportConfig = require('./passport/');
passportConfig(passport);

app.use(passport.initialize());
app.use(passport.session());
```
> `./passport/` 는 `./passport/index.js`와 동일하다.  
> `passport.initialize()`는 req 객체에 passport 설정을 초기화한다.  
> `passport.session()`는 req.session 객체에 passport 정보를 저장한다.  
> req.session은 `express-session`에서 생성하므로 세션보다 뒤쪽에 위치해야 한다.

#### index.js
`serializeUser` : req.session 객체에 어떤 데이터를 저장할지 선택.  
세션에 사용자 정보를 모두 저장하면 세션의 용량이 커지고 데이터 일관성에 문제가 발생.  

`deserializeUser` : 매 요청 시 실행.  
passport.session()이 해당 메서드를 호출한다.
`serializeUser`에서 저장한 값을 통해 데이터베이스에 접근한 후 해당 데이터를 불러온다.  

> `serializeUser` : 사용자 정보 객체를 세션에 저장  
> `deserializeUser` : 세션에 저장된 정보로 DB 접근 후, 사용자 정보 불러옴. (라우터에서 사용)  
> 로그인 하는 방법에 따라 로그인 전략이 다르다. (local, kakao 등)

`done(null, user.id, message)`
1. 첫 번째 인자 : 서버에서 에러 발생.
2. 두 번째 인자 : req.session에 저장될 값.
3. 세 번째 인자 : 에러 메시지.

#### 과정
*로그인 과정* 
1. 로그인 요청이 들어옴.
2. passport.authenticate 호출
3. 로그인 전략 수행
4. 로그인 성공 시 사용자 정보 객체와 함께 req.login 호출
5. req.login 메서드가 serializeUser 호출
6. req.session에 사용자 아이디 저장
7. 로그인 완료

*로그인 이후 과정*
1. 모든 요청에 passport.session()이 deserializeUser 호출
2. req.session에 저장된 아이디로 DB에서 사용자 조회
3. 조회된 사용자 정보를 req.user에 저장
4. 라우터에서 req.user를 통해 사용자 정보 사용.

#### 로컬 로그인
`passport-local`을 사용하여 로그인 전략을 세운다.
로그인한 사용자는 회원가입과 로그인 라우터에 접근하면 안 된다.
로그인하지 않은 사용자는 로그아웃 라우터에 접근하면 안 된다.
이러한 접근 권한을 제어하기 위해 `isAuthenticated()`를 사용한다.  

> 사용자 로그인 여부의 따라 `isAuthenticated()`는 true, false 값을 반환한다.
> brcypt.hash(password, 12)를 통해 암호화한다. (12~31 추천)

`passport.authenticate('local', (authError, user, info) => {})`
1. `passport.authenticate('local')` : 로컬 로그인 전략을 수행하고 해당 결과로 done을 받아온다.
2. 해당 결과 값으로 done()을 받아올 수 있다.
3. 성공적으로 실행이 된다면 req.login 메서드를 호출한다.
4. req.login 메서드는 passport.serializeUser를 호출한다.

`req.logout()` : req.user 객체를 제거.  
`req.session.destory()` : req.session 객체의 내용을 제거.  
`bcrypt.compare(password, exUser.password)` : 입력받은 비밀번호와 원래 비밀번호 비교.

#### 카카오 로그인
로그인 인증 과정이 카카오에서 실행된다.
처음 로그인할 때는 회원가입 처리를 해줘야 하고, 두 번째 로그인부터는 로그인 처리를 해줘야 한다.
process.env.KAKAO_ID에 카카오에서 발급하는 ID가 들어있고
callbackURL은 카카오로부터 인증받은 결과를 받을 라우터 주소이다.
받아온 결과에서 profile에 사용자 정보가 들어있다.

```javascript
// 카카오에서 직접 처리
router.get('/kakao', passport.authenticate('kakao'));

// 처리 결과
router.get('/kakao/callback', passport.authenticate('kakao', {
    failureRedirect: '/',
}), (req, res) => {
    res.redirect('/');
});
```

> failureRedirect에 접속 실패 시 어디로 이동할지가 자동으로 정해진다.

