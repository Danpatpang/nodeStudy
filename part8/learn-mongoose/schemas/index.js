const mongoose = require('mongoose');

module.exports = () => {
    const connect = () => {
        // 콘솔에 쿼리 출력
        if (process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        // 접속 시도
        mongoose.connect('mongodb://계정:비밀번호@localhost:27017/admin', {
            dbName: 'nodejs',
        }, (error) => {
            if (error) {
                console.log('연결 에러', error);
            } else {
                cosnole.log('연결 성공');
            }
        });
    };

    connect();
    // 이벤트 추가
    mongoose.connection.on('error', (err) => {
        console.error("연결 에러", err);
    });
    mongoose.connection.on('disconnected', () => {
        console.error("연결 끊김");
        connect();
    });

    // 스키마 연결
    require('./user');
    require('./comment');
}