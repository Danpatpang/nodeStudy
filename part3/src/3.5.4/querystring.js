const url = require(`url`);
const querystring = require(`querystring`);

//url 형
const parseUrl = url.parse(`http://www.gilbut.co.kr/?page=3&limit=10&category=nodejs&category=javascript`);
const query = querystring.parse(parseUrl.query);
console.log(query);
console.log(querystring.stringify(query));