var CryptoJS = require('crypto-js');

function Md5encrypto(text) {
    var res = CryptoJS.MD5(text);
    var result = res.toString();
    return result
    
}

var text = '123456';
var result = Md5encrypto(text);
console.log(result);