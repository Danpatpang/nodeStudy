var candyMachine = {
    status: {
        name: 'node',
        count : 5,
    },

    getCandy: function() {
        this.status.count--;
        console.log(this.status.count);
        return this.status.count;
    }
};

var getCandy = candyMachine.getCandy;
//var getCandy = candyMachine.getCandy();
var count = candyMachine.status.count;

console.log(getCandy);  // 5
console.log(count);     // 5

const candyMachine2 = {
    status: {
        name2: 'node',
        count2 : 5,
        test : 'hello',
    },
    getCandy2() {
        this.status.count2--;
        return this.status.count2;
    }
}
// 같은 이름끼리 매칭?
const {getCandy2, status: {count2, test} } = candyMachine2;

// 4라는 결과 값
//console.log(candyMachine2.getCandy2());
// 5라는 결과 값
console.log(getCandy2);
console.log(count2);
console.log(test);