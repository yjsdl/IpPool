// PBKDF2 将伪随机函数（例如 HMAC），把明文和一个盐值（salt）作为输入参数，然后进行重复运算，并最终产生密钥

var CryptoJS = require("crypto-js");

function pbkEncrypto(text) {
    var salt = "43215678";
    var res = CryptoJS.PBKDF2(text, salt, {keySize: 128/32, iterations:10});
    var result = res.toString();
    return result
}

var text = '123456';
var result = pbkEncrypto(text);
console.log(result);