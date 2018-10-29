var express = require('express');
const uuidv4 = require('uuid/v4');
var router = express.Router();

router.get('/', function (req, res, next) {
    User.find({
        where: {id: req.user && req.user.id},
        include: {model: Domain},
    })
        .then((user) => {
            res.render('login', {
                user,
                loginError: req.flash('loginError'),
                domains: user && user.domains
            });
        })
        .catch((err) => {
            next(err);
        });
});

router.post('/domain', (req, res, next) => {
    Domain.create({
        userId: req.user.id,
        host: req.body.host,
        type: req.body.type,
        clientSecret: uuidv4()
    })
        .then(() => {
            res.redirect('/');
        })
        .catch((err) => {
            next(err);
        });
});

module.exports = router;
