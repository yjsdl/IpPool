const CryptoJS = require('crypto-js');

function aesEncrypt(text) {
    var key = CryptoJS.enc.Utf8.parse(aeskey);
    var iv = CryptoJS.enc.Utf8.parse(aesiv);
    var text = CryptoJS.enc.Utf8.parse(text);
    var res = CryptoJS.AES.encrypt(text, key,{
        iv:iv,
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7,
    });
    result = res.toString();
    return result
}

function aesDecrypt(text) {
    var key = CryptoJS.enc.Utf8.parse(aeskey);
    var iv = CryptoJS.enc.Utf8.parse(aesiv);
    var res = CryptoJS.AES.decrypt(text, key,{
        iv:iv,
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7,
    });
    result = res.toString(CryptoJS.enc.Utf8);
    return result
}

var aeskey = '7E79g12u3i4d5e68';
var aesiv = '0000000000000000';
var text = '123456'
var res = aesEncrypt(text);
var res1 = aesDecrypt(res);
console.log(res);
console.log(res1);