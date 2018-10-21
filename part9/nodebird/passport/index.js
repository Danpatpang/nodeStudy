const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const {User} = require('../models');

module.exports = (passport) => {
    // req.session 객체에 어떤 데이터를 저장할지 선택.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    // 팔로잉, 팔로워 처리 추가
    // 이해의 어려움 attribute와 as의 정확한 사용 정의 필요...
    passport.deserializeUser((id, done) => {
        User.find({
            where: {id},
            include: [
                {
                    model: User,
                    attribute: ['id', 'nick'],
                    as: 'Followers'
                },
                {
                    model: User,
                    attribute: ['id', 'nick'],
                    as: 'Followings'
                }
            ]
        })
            .then(user => done(null, user))
            .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
}
