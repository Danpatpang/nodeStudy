const timeout = setTimeout(() => {
    console.log(`1.5sec`);
}, 1500);

const interval = setInterval(() => {
    console.log(`1sec cycle`);
},1000);

const timeout2 = setTimeout(() => {
    console.log(`실행되지 않아요`);
});

setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval);
},2500);

const immediate = setImmediate(() => {
    console.log(`right now`);
});

const immediate2 = setImmediate(() => {
    console.log(`실행되지 않습니다`);
});

clearImmediate(immediate2);

/**
 * setTimeout이 setImmediate보다 더 빠름.
 * 항상 그런 것은 아니다.
 * setTimeout(콜백, 0)은 추천하지 않음.
 */

// const Timeout3 = setTimeout(() => {
//     console.log(`비교`);
// },0);
