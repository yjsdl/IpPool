// url = 'https://account.xiaomi.com'
// 用户名手机号， AES加密

var CryptoJS = require('crypto-js');

function Pt(t) {
    t = t || {};
    var i_1 = function(t) {
        for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*", r = "", i = 0; i < t; i++) {
            var n = Math.floor(Math.random() * e.length);
            r += e.substring(n, n + 1)
        }
        return r
    }(16);

    var u = CryptoJS.enc.Utf8.parse("0102030405060708");
    var f = CryptoJS.enc.Utf8.parse(i_1); // i
    var resutl;
    function encrypt(t) {
        var r = t
          , i = CryptoJS.AES.encrypt(r, f, {
            iv: u,
            padding: CryptoJS.pad.Pkcs7
        });
        resutl = i.toString();
        };
    encrypt(t);
    return resutl;
}
console.log(Pt('123456'));

// 密码
// md5加密后转成大写

var pwd = CryptoJS.MD5('123456').toString();
console.log(pwd);