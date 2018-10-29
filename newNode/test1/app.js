var express = require('express');
var handlebars = require('express-handlebars');

var app = express();
app.set('port', process.env.PORT || 3000);
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', handlebars);

app.use(function every(req, res, next) {
    console.log(`##every`);
    next();
});

app.post('/', function everyPost(req, res, next) {
    console.log(`##everyPost`);
    next();
});

app.get(function getUsers(req, res, next) {
    console.log(`##getUsers`);
    res.type('application/json');
    res.json({users: ['a', 'b', 'c', 'd']});
    // res.end(JSON.stringify({users : ['a', 'b', 'c', 'd']}));
    next();
});

var random = null;
// 입력에 따라 random 설정.
app.post('/users', function postUsers(req, res, next) {
    console.log(`##postUsers`);
    if (random) {
        res.type(`application/json`);
        res.json({msg: "입력성공"});
    } else {
        throw Error(`입력실패`);
    }
    next();
});

app.use(function noHandlers(req, res, next) {
    console.log(`##noHandlers`);
    throw Error('404 - Not Found');
});

app.use('/error', function throwError(err, req, res, next) {
    console.log(`##throwError`);
    throw Error('404 - Not Found');
});

app.use(function errorHandler1(err, req, res, next) {
    console.log(`##errorHandler1`);
    // analyzeError(err);
    // 다시 에러를 넘겨야 다음 에러가 호출
    next(err);
});

app.use(function errorHandler2(err, req, res, next) {
    console.log(`##errorHandler2`);
    // analyzeError(err);
    // 다시 에러를 넘겨야 다음 에러가 호출
    console.error(err);
    next(err);
});

app.use(function everyErrorHandler(err, req, res, next) {
    console.log(`##everyErrorHandler`);
    res.status(404);
    res.json({msg: err.message});
});

app.listen(app.get('port'), () => {
    console.log(`Express port ${app.get('port')}`);
});

/*
* 일반적으로 post가 next하는 경우가 없다.
* 사용자에게 소스코드의 에러위치를 보여주는 것은 좋지 않다.
* 에러 메시지만 보내도 사용자에게 보여주지 않는다.
*
* 다른 녀석들은 파라미터가 3개이지만 에러는 4개를 받는다.
* 와일드 카드를 함부로 타지 말 것.
* 선언 위치 굉장히 조심할 것.
*
* 에러가 발생하면 바로 에러 이벤트로 넘어가고 다른 이벤트로 넘기고 싶으면 또 다른 에러를 발생시키거나 기존 에러를 넘김.
 */