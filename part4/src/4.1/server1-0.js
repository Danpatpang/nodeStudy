const http = require(`http`);

const server = http.createServer((req,res) => {
    res.write(`<h1>Hello Node</h1>`);
    res.end(`<p>Hello Server</p>`);
});

server.listen(8888);
server.on(`listening`, () => {
    console.log(`8888 대기 중`);
})
server.on(`error`, (err) => {
    console.error(err);
})