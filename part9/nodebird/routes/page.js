var express = require('express');
const {isLoggedIn, isNotLoggedIn} = require('./middlewares');
const {User, Post} = require('../models');
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

// 게시글을 조회한 뒤 결과를 twits에 넣어 렌더링.
// 조회할 때 id, nick을 join해서 제공.
router.get('/', function (req, res, next) {
    // 게시물 조회
    Post.findAll({
        include: {
            model: User,
            attribute: ['id', 'nick']
        },
        order: [['createdAt', 'DESC']]
    })
        .then((posts) => {
            res.render('main', {
                title: 'Nodebird',
                twits: posts,
                user: req.user,
                loginError: req.flash('loginError')
            });
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

module.exports = router;
