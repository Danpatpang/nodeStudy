# Express

서버 제작 시 불편함을 해소하고, 편의 기능을 추가한 *웹 서버 프레임워크*.
다운로드 수가 많다고 모두 좋은 것은 아니지만, 많은 사람이 사용할수록 버그가 적고, 기능 추가나 유지보수도 활발하게 일어난다.
___

### Express-generator

입문자 입장에서는 express이외에 필요한 패키지를 찾아서 설치하기 어렵다.
이 문제를 해결해주기 위해서 `Express-generator`라는 패키지가 있다.
Express-generator 패키지는 프레임워크에 필요한 package.json 파일을 생성해주고 기본 폴더 구조까지 만들어 준다.  
`npm -i -g express-generator` 명령어를 통해 해당 패키지를 설치할 수 있다.  
패키지 설치 이후에는 `express [project name] [option]` 명령어로 프로젝트를 생성할 수 있다.

> `[option]`에는 `--view=pug` 또는 `--view=ejs`를 쓸 수 있다.  
> 해당 옵션은 템플릿 엔진을 pug 또는 ejs로 설치하는 옵션이다.  
> default는 jade로 설정이 되어있는데 jade는 pug와 동일하다.

생성된 프로젝트 위치에서 `npm install` 명령어로 package.json 내부의 모듈을 설치할 수 있다.

### 폴더 구조
```
* bin
    -> www
* node_modules
* public
    -> images
    -> javascripts
    -> stylesheets
* routes
    -> index.js
    -> users.js
* views
    -> error.pug
    -> index.pug
    -> layout.pug
* app.js
* package-lock.json
* package.json
```
* `app.js` : 핵심적인 서버 역할
* `bin -> www` : 서버를 실행하는 스크립트
* `public` : 외부에서 접근 가능한 파일을 모아둠(img, js, css 등)
* `routes` : 주소별 라우터들을 모아둠
* `views` : 템플릿 파일을 모아둠

`models(데이터베이스) - views(템플릿) - routes(라우터)`과 같이 MVC 패턴을 이루게 된다.  
`npm start` 또는 `npm run start`를 입력하면 서버가 실행되는 것을 볼 수 있다.
콘솔에서는 추가적으로 클라이언트가 보내는 요청에 관한 정보가 기록된다.

### 익스프레스 구조 이해
```javascript
// bin/www의 핵심 부분
#!/usr/bin/env node

var app = require('../app');
var debug = require('debug')('src:server');
var http = require('http');

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);
```
www 파일은 http 모듈에 express 모듈을 연결하고, 포트를 지정한다.
파일 뒤에 `.js` 확장자가 붙어있지 않은데 `#!/usr/bin/env node`가 콘솔 명령어로 실행되게 한다.
동작 과정은 다음과 같다.

1. app, debug, http 모듈을 가져온다.
2. 서버가 실행될 포트를 설정한다.
3. createServer()에 불러온 app 모듈을 넣어준다.
4. 서버에 포트와 이벤트를 연결하고 실행한다.

```javascript
// app.js
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
```
app 모듈의 동작 과정은 다음과 같다.

1. 각 모듈을 불러오고 express 객체를 생성한다.
2. `app.set()`을 통해 express 객체를 설정한다.
3. `app.use()`를 통해 express와 미들웨어(모듈)를 연결한다.
4. app 객체를 만들어 www 파일에서 서버로 생성한다.

클라이언트의 요청을 받아서 응답한다는 점은 동일하다.
하지만, 중간에 미들웨어들을 거치게 된다.  
*기존 방식*  
```
Client -> 요청 -> Server -> 응답 -> Client
```
*미들웨어 사용* 
```
Client -> 요청 -> 미들웨어 (-> 요청 -> Server -> 응답 -> 미들웨어) -> 응답 -> Client
```
### 미들 웨어

미들웨어는 익스프레스의 핵심으로 요청과 응답의 중간에 위치한다.
미들웨어는 요청과 응답을 조작하여 기능을 추가하거나 이상한 요청을 걸러낸다.
`app.use()`의 인자로 들어있는 함수가 미들웨어로 위의 코드를 살펴보면,
`logger -> express.json() -> express.urlencoded() -> ... -> function(err, req, res, next)`처럼
순차적으로 거친 후 라우터에서 클라이언트로 응답을 보낸다.

> 라우터와 에러 핸들러도 미들웨어의 일종이다.

미들웨어는 `app.use()`에 선언된 순서대로 실행되게 되며,
반드시 내부에 `next()`가 있어야 다음 미들웨어로 넘어갈 수 있다.
만약 `next()`가 없다면 해당 미들웨어에 갇혀 응답을 보낼 수 없게 된다.
`next()`는 3가지의 종류가 있다.

* next() : 다음 미들웨어로 이동
* next('route') : 해당 라우터로 이동
* next(error) : 에러 핸들러로 이동

즉, 라우터 이외에 다른 값을 넣게 되면 바로 에러 핸들러로 이동하게 된다.
`app.use()`는 여러 개의 미들웨어를 인자로 한 번에 넣어 선언해도 상관없지만 가독성을 위해 따로 선언하는 것이 좋다.


![미들 웨어](http://i.imgur.com/oGUSkq8.png)

### 미들 웨어의 종류
* morgan : 콘솔에 로그 출력(HTTP 요청, 주소, HTTP 상태코드, 응닶 속도, 응답 바이트)  
(인자로 dev, short, common, combined 등을 사용할 수 있다.)
* body-parser : 요청의 본문을 해석(FORM, AJAX 요청의 데이터 처리)
* cookie-parser : 동봉된 쿠키 해석
* static : 정적인 파일 제공(body-parser와 함께 express에 내장된 객체)
* express-session : 세션 관리용
* connect-flash : 일회성 메시지를 웹 브라우저에 보냄

___