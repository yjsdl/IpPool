const CryptoJS = require('crypto-js')

function hmacEncrypt(text) {
    var key = '123456';
    var res = CryptoJS.HmacMD5(text, key);
    var result = res.toString();
    return result
}

var text = '123456'
res = hmacEncrypt(text);
console.log(res);