const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const { User } = require('../models');

module.exports = (passport) => {
    // req.session 객체에 어떤 데이터를 저장할지 선택.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.find({where : {id} })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
}
