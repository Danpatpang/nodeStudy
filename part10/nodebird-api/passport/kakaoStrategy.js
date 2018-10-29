const kakaoStrategy = require('passport-kakao').Strategy;
const {User} = require('../models');

module.exports = (passport) => {
    passport.use(new kakaoStrategy({
            clientID: process.env.KAKAO_ID,
            callbackURL: '/auth/kakao/callback'
        }, async (acessToken, refreshToken, profile, done) => {
            try {
                const exUser = await User.find({where: {snsId: profile.id, provider: 'kakao'}});
                // 회원 확인
                if (exUser) {
                    done(null, exUser);
                } else {
                    // 회원 가입
                    const newUser = await User.create({
                        // 잘 모르겠음... &&를 왜 쓰는가.
                        email: profile._json && profile._json.kaccout_email,
                        nick: profile.displayName,
                        snsId: profile.id,
                        provider: 'kakao'
                    });
                    done(null, newUser);
                }
            } catch (err) {
                console.error(err);
                done(err);
            }
        }
    ))
}