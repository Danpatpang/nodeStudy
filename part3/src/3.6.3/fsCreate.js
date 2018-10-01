const fs = require(`fs`);

// 3 중에 하나는 실행되냐
fs.access(`./folder`, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
    if (err) {
        // 폴더 / 파일 없을 때 발생하는 에러
        if (err.code == `ENOENT`) {
            console.log(`폴더 없음`);
            fs.mkdir(`./folder`, (err) => {
                if (err) {
                    throw err;
                }
                console.log(`폴더 만들기 성공`);
                fs.open(`./folder/file.js`, `w`, (err, fd) => {
                    if (err) {
                        throw err;
                    }
                    console.log(`빈 파일 만들기 성공`, fd);
                    fs.rename(`./folder/file.js`, `./folder/newfile.js`, (err) => {
                        if (err) {
                            throw err;
                        }
                        console.log(`이름 바꾸기 성공`);
                    });
                });
            });
        } else {
            throw err;
        }
    } else {
        console.log(`이미 폴더 존재`);
    }
});

/**
 * F_OK : 0 존재하는가
 * R_OK : 4
 * W_OK : 2
 * X_OK : 1 읽고 쓸 수 있는가
 * 0:000
 * 1:001
 * 2:010
 * 4:100
 * 비트 연산
 *
 */