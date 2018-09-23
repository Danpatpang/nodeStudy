const a = `hello`;
const b = `1`;
const c = 1;
const func = () => {
    console.log(`test`);
}

module.exports = {
    a,
    b,
    c,
    func,
};

/**
 * function은 exports를 이용하여 바로 넘기기 불가!!!
 */

//exports.test = `test`;
//exports.func2 = () => console.log(`test2`);