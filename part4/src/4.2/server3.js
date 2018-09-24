const http = require(`http`);

const parseCookies = (cookie = ``) =>
    cookie
        .split(`;`)
        .map(v => v.split(`=`))
        // 의미를 모르겠음.
        .map(([k, ...vs]) => [k, vs.join(`=`)])
        .reduce((acc, [key, value]) => {
            acc[key.trim()] = decodeURIComponent(value);
            return acc;
        }, {});

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    console.log(req.url, cookies);
    res.writeHead(200, {'Set-Cookie': 'mycookie=test'});
    res.end(`hello`);
})
    .listen(8888, () => {
        console.log(`8888에서 대기 중`);
    });