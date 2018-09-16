var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xhr = new XMLHttpRequest();
xhr.onload = function(){
    if (xhr.status == 200 || xhr.status == 201){
        console.log(xhr.responseText);
    }
};
xhr.onerror = function(){
    console.error(xhr.responseText);
};
xhr.open('GET', 'https://www.zerocho.com/api/get');
xhr.send();