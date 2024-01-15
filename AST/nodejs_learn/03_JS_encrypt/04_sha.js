const SHA = require('crypto-js');
function shaencrypt(text) {
    var result = SHA.SHA256(text);
    var result = result.toString();
    return result
    
}

var text = '123456';
var res = shaencrypt(text);
console.log(res);