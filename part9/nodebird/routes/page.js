var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/profile', function (req, res, next) {
    res.render('profile', {title: '내 정보 - NodeBird', user: null});
});

router.get('/join', function (req, res, next) {
    res.render('join', {
        title: '회원가입 - NodeBird',
        user: null,
        joinError: req.flash('joinError')
    });
});

router.get('/', function (req, res, next) {
    res.render('main', {
        title: 'NodeBird',
        twits: [],
        user: null,
        joinError: req.flash('loginError')
    });
});

module.exports = router;
