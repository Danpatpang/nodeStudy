var express = require('express');
var handlebars = require('express-handlebars');

var fortunes = [
    "1번 포츈",
    "2번 포츈",
    "3번 포츈",
    "4번 포츈",
    "5번 포츈"
];

var app = express();
app.set('port', process.env.PORT || 3000);
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    var randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
    res.render('about', {fortune : randomFortune});
})

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