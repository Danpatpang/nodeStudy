const promise1 = Promise.resolve(`성공1`);
const promise2 = Promise.resolve(`성공2`);
//2개 모두 resolve일 시 한 번에 실행.
//하나라도 rejcet일 시 catch로 반환.
Promise.all([promise1, promise2])
.then( (result) => {
    console.log(result);
})
.catch( (err) => {
    console.error(err);
})