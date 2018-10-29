var express = require('express');
var handlebars = require('express-handlebars');

var app = express();
app.set('port', process.env.PORT || 3000);
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', handlebars);

//2.1.1
var every = (req, res) => {
    console.log(`every`);
};

//2.1.2
var everyPost = (req, res) => {
    console.log(`everyPost`);
};

//2.1.4.2
var everyErrorHandler = (req, res) => {
    res.status(404);
    res.render('home', {msg: '입력실패'});
    console.log(`everyErrorHandler`);
};

// 2.1.5
var noHandlers = (req, res, next) => {
    console.log(`noHandlers`);
    next();
};

// 2.1.6
var throwError = (req, res, next) => {
    console.log(`throwError`);
    res.status(404);
    var err = new Error('Error test');
    next(err);
};

// 2.1.7
function analyzeError(err) {
    console.log(`analyzeError ${err}`);
}

var errorHandler1 = (err, req, res) => {
    console.log(`errorHandler1`);
    if (err) {
        res.status(404);
        analyzeError(err);
    }
};
// 2.1.8
function errorLog(err) {
    console.log(`errorLog ${err}`);
}

var errorHandler2 = (err, req, res) => {
    console.log(`errorHandler2`);
    if (err) {
        errorHandler1(err);
        errorLog(err);
    }
};

// 2.1.3
app.get('/users', (req, res) => {
    res.json({users: ['a', 'b', 'c', 'd']});
    console.log('/users');
});
// 2.1.4
app.post('/users', (req, res) => {
    if(req.users in ['e', 'f', 'g']) {
        var random = Math.floor(Math.random() * 10);
        if(random === 0) {
            everyErrorHandler(req, res);
        } else {
            res.render('home', {msg: '입력성공'});
            console.log(`/users`);
        }
    }
});

app.all('/error', throwError);
app.post('/*', everyPost);
app.all('/*', every);

app.use(noHandlers);
app.use((err, req, res) => {
    errorHandler1(err);
    next();
});
app.use((err, req, res) => {
    errorHandler2(err);
});

app.listen(app.get('port'), () => {
    console.log(`Express port ${app.get('port')}`);
});