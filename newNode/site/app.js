var express = require('express');
var handlebars = require('express-handlebars').create({
    defaultLayout: 'main',
    // this._sections는 무엇인가????
    helpers: {
        section: (name, options) => {
            if (!this._sections) {
                this._sections = {};
            }
            this._sections[name] = options.fn(this);
            return null;
        }
    }
});
var fortune = require('./lib/fortune');

var app = express();
app.set('port', process.env.PORT || 3000);
app.engine('handlebars', handlebars.engine)
    .set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

// 테스트 코드를 찾는 미들웨어
// 테스트가 항상 있는 것은 좋지 않음. (배포 시 지움)
app.use((req, res, next) => {
    // ?test=1로 들어올 경우
    res.locals.showTests = app.get('env') !== 'production' && req.query.test === '1';
    next();
});

function getWeatherData() {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://www.wunderground.com/US/OR/Portland.html',
                iconUrl: 'http:/icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Overcast',
                temp: '54.1F (12.3C)'
            },
            {
                name: 'Bend',
                forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
                iconUrl: 'http:/icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Partly Cloudy',
                temp: '55.0F (12.8C)'
            },
            {
                name: 'Manzanita',
                forecastUrl: 'http://www.wunderground.com/US/OR/Manzanita.html',
                iconUrl: 'http:/icons-ak.wxug.com/i/c/k/rain.gif',
                weather: 'Light Rain',
                temp: '55.0F (12.8C)'
            }
        ]
    }
}

app.use((req, res, next) => {
    if (!res.locals.particals) {
        res.locals.particals = {};
    }
    res.locals.particals.weatherContext = getWeatherData();
    next();
});

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/error', (req, res) => {
    res.status(500);
    res.render('error');
    // 다음과 동일
    res.status(500)
        .render('error');
});

app.get('/greeting', (req, res) => {
    res.render('about', {
        message: 'welcome',
        style: req.query.style,
        userid: req.cookie.userId,
        username: req.session.username
    })
});

app.get('/no-layout', (req, res) => {
    res.render('no-layout', {layout: null});
});

app.get('/custom-layout', (req, res) => {
    res.render('custom-layout', {layout: 'custom'});
});

app.get('test', (req, res) => {
    res.type('text/plain');
    res.send('this is a test');
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