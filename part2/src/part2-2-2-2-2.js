var XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
var xhr = new XMLHttpRequest();
var formdata = new FormData();
formdata.append('name', 'zerocho');
formdata.append('birth', '1994');

xhr.onreadystatechange = function() {
    if(xhr.readyState == xhr.DONE){
        if(xhr.status == 200 || xhr.status == 201){
            console.log(xhr.responseText);
        }
        else{
            console.error(xhr.responseText);
        }
    }
}

xhr.open('POST', 'https://www.zerocho.com/api/post/formdata');
xhr.send(formdata);