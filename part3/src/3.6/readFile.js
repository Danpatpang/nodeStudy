const fs = require(`fs`);

fs.readFile(`./readme.txt`, (err, data) => {
    if (err) {
        throw err;
    }
    // data는 buffer 형식
    console.log(data);
    console.log(data.toString());
});