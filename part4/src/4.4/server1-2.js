const http2 = require(`http2`);
const fs = require(`fs`);

http2.createSecureServer({
    cert : fs.readFileSync(`도메인 인증 경로`),
    key : fs.readFileSync(`도메일 비밀키 경로`),
    ca : [
        fs.readFileSync(`상위 인증 경로`),
        fs.readFileSync(`상위 인증 경로`),
    ],
}, (req, res) => {
    res.write(`<h1>Hello Node!</h1>`);
    res.end(`<p>Hello Server</p>`)
}).listen(8888, () => {
    console.log(`8888 대기 중`);
})