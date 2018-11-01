var express = require('express');
var handlebars = require('express-handlebars');
var fortune = require('./lib/fortune');

var app = express();
app.set('port', process.env.PORT || 3000);
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/about', (req, res) => {
    res.render('about', {fortune : fortune.getFortune()});
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