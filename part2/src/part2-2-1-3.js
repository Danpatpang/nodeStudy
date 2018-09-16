var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xhr = new XMLHttpRequest();
var data = {
    name : `zerocho`,
    birth : `1994`,
};
xhr.onreadystatechange = function(){
    if(xhr.readyState == xhr.DONE){
        if(xhr.status == 200 || xhr.status == 201){
            console.log(xhr.responseText);
        }else{
            console.error(xhr.responseText);
        }
    }
};
xhr.open('POST', 'http://www.zerocho.com/api/post/json');
xhr.setRequestHeader('Content-Type', 'application/JSON');
xhr.send(JSON.stringify(data)); // 데이터를 동봉해서 보냄