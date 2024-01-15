var CryptoJS = require('crypto-js');

function base64encrypto(text){
    var data = CryptoJS.enc.Utf8.parse(text);
    var result = CryptoJS.enc.Base64.stringify(data);
    return result
}

function base64decrypto(text) {
    var data = CryptoJS.enc.Base64.parse(text);
    var result = data.toString(CryptoJS.enc.Utf8);
    return result
}

var text = '123456';
var encry = base64encrypto(text);
var decry = base64decrypto(encry);
console.log(encry);
console.log(decry);

// (2) [825373492, 892731392]
// (2) [825373492, 892731392]