const http = require(`http`);
const fs = require(`fs`);

http.createServer((req,res) => {
    fs.readFile(`./server2.html`, (err,data) => {
        if(err){
            console.error(err);
        }
        res.end(data);
    });
}).listen(8888, () => {
    console.log(`request 대기 중`);
})