const fs = require(`fs`);

const readStream = fs.createReadStream(`./readme3.txt`, {highWaterMark : 8});
const data = [];

readStream.on(`data`, (chuck) => {
    data.push(chuck);
    console.log(chuck, chuck.length);
});
readStream.on(`end`, () => {
    console.log(Buffer.concat(data).toString());
});

readStream.on(`error`, (err) => {
    console.log(err);
})