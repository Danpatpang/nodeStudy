const cluster = require(`cluster`);
const http = require(`http`);
const numCPUs = require(`os`).cpus().length;

if(cluster.isMaster){
    console.log(`마스터 id ${process.pid}`);
    // 생산
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
    // 종료
    cluster.on(`exit`, (worker, code, signal) => {
        console.log(`${worker.process.pid} 종료`);
        //워커가 죽을 때마다 새로운 워커 생산.
        //cluster.fork();
    });
} else {
    http.createServer((req, res) => {
        res.write(`<h1>Hello Node</h1>`);
        res.end(`<p>Hello</p>`);
        setTimeout(() => {
            process.exit(1);
        }, 1000);
    }).listen(8888, () => {
        console.log(`${process.pid} 실행`)
    })
}

// 종료 순서는 랜덤???