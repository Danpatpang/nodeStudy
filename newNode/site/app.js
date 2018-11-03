var express = require('express');
var handlebars = require('express-handlebars');
var fortune = require('./lib/fortune');

var app = express();
app.set('port', process.env.PORT || 3000);
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

// 테스트 코드를 찾는 미들웨어
// 테스트가 항상 있는 것은 좋지 않음. (배포 시 지움)
app.use((req, res, next) => {
    // ?test=1로 들어올 경우
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', {
        fortune: fortune.getFortune(),
        pageTestScript : "/qa/test-about.js"
    });
})

app.get('/tours/hood-river', (req, res) => {
    res.render('tours/hood-river');
});

app.get('/tours/request-group-rate', (req, res) => {
    res.render('tours/request-group-rate');
});

// 404 page
app.use((req, res) => {
    res.status(404);
    res.render('404');
});

app.use((err, req, res, next) => {
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), () => {
    console.log(`Express port ${app.get('port')}`);
});