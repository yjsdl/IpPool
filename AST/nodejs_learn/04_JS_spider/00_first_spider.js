// const axios = require("axios");
// axios({
//     'url': 'http://www.baidu.com',
//     'method': 'get',

// }).then(res => {
//     console.log(res.data);
// })

(function (){
    "use strict";
    let getTimes = 0;
    let timeBase = 1684374031115;
    Date.prototype.getTime = function() {
        let time = timeBase + getTimes * 100
        console.log(`第${getTimes}次获取时间，值${time}`);
        return getTimes++, time
};
})();
var aa = new Date();
var cc = aa.getTime();
console.log(new Date());

