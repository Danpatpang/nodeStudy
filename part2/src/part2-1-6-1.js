 const condition = true;
 // true면 resolve, false면 reject
 const promise = new Promise((resolve, reject) => {
     if(condition){
         resolve(`성공`);
     }else{
         reject(`실패`);
     }
});

promise.then((message) => {
    console.log(message);
})
.catch((error) => {
    console.log(error);
});

promise.then((message) => {
    return new Promise((resolve,reject) => {
        resolve(message);
        //console.log(1);
    });
})
.then((message2) => { 
    return new Promise((resolve,reject) => {
        resolve(message2);
        //reject(message2);
        //console.log(1);
    });
})
.then((message3) => {
    return new Promise((resolve, reject) => {
        resolve(message3);
        //console.log(1);
    });
})
.catch((error) => {
    return new Promise((resolve, reject) => {
        reject(error);
        //console.log(2);
    });
});