const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const {User} = require('../models');

module.exports = (passport) => {
    passport.use(new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password',
        },
        // done은 passport.authenticate의 콜백 함수
        async (email, password, done) => {
            try {
                const exUser = await User.find({where: {email}});
                // 가입 확인
                if (exUser) {
                    // 비밀번호 확인
                    const result = await bcrypt.compare(password, exUser.password);
                    if (result) {
                        done(null, exUser);
                    } else {
                        done(null, false, {message: "비밀번호 불 일치"});
                    }
                } else {
                    done(null, false, {message: "가입되지 않음"});
                }
            } catch (err) {
                console.error(err);
                done(err);
            }
        }));
};