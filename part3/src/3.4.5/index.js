/**
 * 보내는 객체의 이름과 받는 이름은 같아야 한다..
 */
const {a, b, d} = require(`./module`);
const {c, func} = require(`./module`);
//const {test, func2} = require(`./module`);

console.log(a, b, c);
console.log(a, b, d);
func();

//console.log(test);
//func2();
