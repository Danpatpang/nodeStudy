const fs = require(`fs`);

fs.readdir(`./folder`, (err, dir) => {
    if (err) {
        throw err;
    }
    // 윈도우에서는 파일이름 대소문자 구분 X
    console.log(`폴더 내용 확인`, dir);
    fs.unlink(`./folder/newFile.js`, err => {
        if (err) {
            throw err;
        }
        console.log(`파일 삭제 성공`);
        fs.rmdir(`./folder`, err => {
            if (err) {
                throw err;
            }
        });
    });
});