var express = require('express');
const {isLoggedIn, isNotLoggedIn } = require('./middlewares');

var router = express.Router();

/* GET home page. */
router.get('/profile', isLoggedIn, function (req, res, next) {
    res.render('profile', {title: '내 정보 - NodeBird', user: null});
});

router.get('/join', isNotLoggedIn, function (req, res, next) {
    res.render('join', {
        title: '회원가입 - NodeBird',
        user: req.user,
        joinError: req.flash('joinError')
    });
});

router.get('/', function (req, res, next) {
    res.render('main', {
        title: 'NodeBird',
        twits: [],
        user: req.user,
        joinError: req.flash('loginError')
    });
});

module.exports = router;
