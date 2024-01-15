var CryptoJS = require('crypto-js');

function getFanyiYoudao(data, ua){
    var bv = CryptoJS.MD5(ua).toString()
        , lts = "" + (new Date).getTime()
        , salt = lts + parseInt(10 * Math.random(), 10);
    var sign = CryptoJS.MD5("fanyideskweb" + data + salt + "Ygy_4c=r#e#4EX^NUGUc5").toString()
    return {'bv':bv, 'lts':lts, 'salt':salt, 'sign':sign}
}

var aa = getFanyiYoudao('test', "5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36")
console.log(aa);


var vvv = 'hello, world'
console.log(vvv.substring(1, 3));
