const url = require(`url`);

const URL = url.URL;
const MyURL = new URL(`http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor`);
console.log(MyURL);
console.log(url.format(MyURL));
console.log(`=========`);

const parsedURL = url.parse(`http://www.gilbut.co.kr/book/bookList.aspx?sercate1=001001000#anchor`);
console.log(parsedURL);
console.log(url.format(parsedURL));