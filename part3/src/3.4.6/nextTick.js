setImmediate(() => {
    console.log(`immediate`);
});

process.nextTick(() => {
    console.log(`nextTic`);
})

setTimeout(() => {
    console.log(`timeout`);
}, 0);

Promise.resolve().then(() => console.log(`promise`));

/*
 * 실행 순서 : process.nextTick, Promise, setTimeout, setImmediate
 * nextTick, Promise를 마이크로테스크(microtask)라고 따로 부름.
 */