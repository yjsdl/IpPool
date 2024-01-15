function EncodeAlgorithm(plaintext, codenum) {
    var Brn;
    var Prn;
    var Zrn;
    var grn;
    var nums = new Array();
    var Arn = plaintext.split(",");
    for (grn = 0; grn < Arn.length; grn++) {
        var one = new Array();
        console.log(`'第${grn}次 -- codenum的值为${codenum}'`)
        Brn = ((codenum >> 8) & 65535) % Arn.length;
        codenum *= 65793;
        codenum &= 4294967295;
        codenum += 4282663;
        Prn = (((codenum &= 8388607) >> 8) & 65535) % Arn.length;
        codenum *= 65793;
        codenum &= 4294967295;
        codenum += 4282663;
        codenum &= 8388607;
        console.log(`'第${grn}次 -- codenum的值为${codenum} -- 结果为${Brn}与${Prn}交换'`);
        Zrn = Arn[Prn];
        Arn[Prn] = Arn[Brn];
        Arn[Brn] = Zrn;
    };
    console.log(Arn);
    var zrn;
    for (var i= nums.length -1 ; i>=0 ;i--){
        // console.log(nums[i]);
        Brn = nums[i][0];
        Prn = nums[i][1];
        zrn = Arn[Prn];
        Arn[Prn] = Arn[Brn];
        Arn[Brn] = zrn;
    }
    console.log(Arn);
    return Arn.join(",")
};

function DecodeAlgorithm(plaintext, codenum) {
    var Brn;
    var Prn;
    var Zrn;
    var grn;
    var Arn = plaintext.split(",");
    for (grn = 0; grn < Arn.length; grn++) {
        console.log(`'第${grn}次 -- codenum的值为${codenum}'`)
        codenum &= 8388607;
        codenum += 4282663;
        codenum &= 4294967295;
        codenum *= 65793;
        Prn = (((codenum &= 8388607) >> 8) & 65535) % Arn.length;
        codenum += 4282663;
        codenum &= 4294967295;
        codenum *= 65793;
        Brn = ((codenum >> 8) & 65535) % Arn.length;
        console.log(`'第${grn}次 -- codenum的值为${codenum} -- 结果为${Brn}与${Prn}交换'`);
        Zrn = Arn[Brn];
        Arn[Brn] = Arn[Prn];
        Arn[Prn] = Zrn;
    };
    // console.log(Arn);
    // var zrn;
    // for (var i= nums.length -1 ; i>=0 ;i--){
    //     // console.log(nums[i]);
    //     Brn = nums[i][0];
    //     Prn = nums[i][1];
    //     zrn = Arn[Prn];
    //     Arn[Prn] = Arn[Brn];
    //     Arn[Brn] = zrn;
    // }
    // console.log(Arn);
    return Arn.join(",")
};

// var aa = "2,188r9,3E05,9N81,>33,2,188r9,3E05,9N81,>33,7a74G7m23Vrp0o5c934382G1LLQhT2XoNiC8FE50EPbQ==,188r9,3E05,9N81,>33,149362,188r9,3E05,9N81,>33,-100,188r9,3E05,9N81,>33,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36,uaend,12147,20030107,zh-CN,Gecko,5,0,0,0,415583,0,1920,1040,1920,1080,1920,969,1920,,cpen:0,i1:0,dm:0,cwen:0,non:1,opc:0,fc:0,sc:0,wrc:1,isc:0,vib:1,bat:0,x11:0,x12:1,8100,0.14172349470,844518918840,0,loc:,188r9,3E05,9N81,>33,-105,188r9,3E05,9N81,>33,0,-1,0,0,1382,1382,0;0,-1,0,0,1778,1019,0;,188r9,3E05,9N81,>33,-108,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-101,188r9,3E05,9N81,>33,do_en,dm_en,t_en,188r9,3E05,9N81,>33,-110,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-117,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-109,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-102,188r9,3E05,9N81,>33,0,-1,0,0,1382,1382,0;0,-1,0,0,1778,1019,0;,188r9,3E05,9N81,>33,-111,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-114,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-103,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-106,188r9,3E05,9N81,>33,0,0,188r9,3E05,9N81,>33,-115,188r9,3E05,9N81,>33,1,32,32,0,0,0,0,1993,0,1689037837680,-999999,18068,0,0,3011,0,0,1995,0,0,F2EFED842C6A97F8E7973146FB1BB616~-1~YAAQmx4gFwdixJ2IAQAA44Ff1wodNU42/7GPuZZYZyM/68bs/5YGddqgPgr+LLgueD5I7M8i8iRDgP3WT6kWeYj4VGnZvWMp+D5nS4wN0o6CA43OqxkqadecQLCo2eM+BJU7L5V2yA8cHn6Evhx3U64BYu3j4GuMqQ6NnqL97tWYr/peOR5tzS60HQK4rRb3glT6PMnNHo7Kq0AUvEuHxrMh182mnM6J6VXjAJmKzfqQEDl2QyBG76LQAngS5UJHlq6U7NfB97qrSkMzaGhZEWbdIZF0otLUg516EJ6kM4DvPdWpXtXBc1ScBQHh/3XUqnKTvTfm4cGewBUsx7fsDQvsAwhtzXkhAW3Y9qJ98VaMnBdBKnLNJE+NX46OyT4SU/cXtcKb5RReGay5yLuBLQ==~-1~-1~-1,36818,-1,-1,30261693,PiZtE,109580,77,0,-1,0,188r9,3E05,9N81,>33,-112,188r9,3E05,9N81,>33,https://www.ups.com/track?loc=en_US&requester=ST/,188r9,3E05,9N81,>33,-119,188r9,3E05,9N81,>33,-1,188r9,3E05,9N81,>33,-122,188r9,3E05,9N81,>33,0,0,0,0,1,0,0,188r9,3E05,9N81,>33,-123,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-124,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-126,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-127,188r9,3E05,9N81,>33,8,188r9,3E05,9N81,>33,-128,188r9,3E05,9N81,>33,,,,188r9,3E05,9N81,>33,-131,188r9,3E05,9N81,>33,,,,,188r9,3E05,9N81,>33,-132,188r9,3E05,9N81,>33,,,188r9,3E05,9N81,>33,-133,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-70,188r9,3E05,9N81,>33,-1,188r9,3E05,9N81,>33,-80,188r9,3E05,9N81,>33,94,188r9,3E05,9N81,>33,-90,188r9,3E05,9N81,>33,1,4562,2,2281|15464,188r9,3E05,9N81,>33,-116,188r9,3E05,9N81,>33,0,188r9,3E05,9N81,>33,-129,188r9,3E05,9N81,>33,"
var aa = "3E05,3E05,188r9,12147,9N81,,0,188r9,1040,0,188r9,1920,0;,9N81,>33,3E05,3E05,3E05,188r9,9N81,3E05,9N81,3E05,149362,>33,3E05,30261693,>33,vib:1,>33,3E05,20030107,3E05,8100,loc:,>33,,>33,-127,188r9,1920,3E05,,77,9N81,>33,9N81,i1:0,188r9,2,non:1,9N81,fc:0,3E05,32,isc:0,32,9N81,4562,>33,0,2,188r9,>33,9N81,0;,3E05,3E05,-115,>33,188r9,3E05,188r9,188r9,9N81,>33,188r9,-110,>33,do_en,188r9,>33,>33,3E05,>33,188r9,3E05,Gecko,-90,9N81,3E05,0,0,,9N81,>33,-101,844518918840,9N81,9N81,,3E05,3E05,1382,9N81,>33,188r9,3E05,3E05,0,cpen:0,188r9,dm:0,5,188r9,188r9,9N81,3011,7a74G7m23Vrp0o5c934382G1LLQhT2XoNiC8FE50EPbQ==,9N81,3E05,188r9,9N81,,9N81,3E05,3E05,9N81,9N81,188r9,>33,-100,>33,>33,x12:1,3E05,>33,188r9,3E05,-1,-133,188r9,1778,9N81,0,0,0,188r9,>33,188r9,188r9,cwen:0,3E05,1382,188r9,-105,0,3E05,>33,0,1995,3E05,0,,>33,>33,0,188r9,188r9,>33,,188r9,0,9N81,3E05,188r9,188r9,3E05,1920,,188r9,188r9,3E05,>33,,-103,9N81,-1,>33,1382,-1,F2EFED842C6A97F8E7973146FB1BB616~-1~YAAQmx4gFwdixJ2IAQAA44Ff1wodNU42/7GPuZZYZyM/68bs/5YGddqgPgr+LLgueD5I7M8i8iRDgP3WT6kWeYj4VGnZvWMp+D5nS4wN0o6CA43OqxkqadecQLCo2eM+BJU7L5V2yA8cHn6Evhx3U64BYu3j4GuMqQ6NnqL97tWYr/peOR5tzS60HQK4rRb3glT6PMnNHo7Kq0AUvEuHxrMh182mnM6J6VXjAJmKzfqQEDl2QyBG76LQAngS5UJHlq6U7NfB97qrSkMzaGhZEWbdIZF0otLUg516EJ6kM4DvPdWpXtXBc1ScBQHh/3XUqnKTvTfm4cGewBUsx7fsDQvsAwhtzXkhAW3Y9qJ98VaMnBdBKnLNJE+NX46OyT4SU/cXtcKb5RReGay5yLuBLQ==~-1~-1~-1,,188r9,>33,109580,-109,wrc:1,3E05,0,9N81,3E05,9N81,,969,PiZtE,9N81,9N81,0,9N81,>33,-1,3E05,3E05,0,3E05,0,3E05,-111,>33,>33,>33,1019,-70,9N81,0,0,3E05,x11:0,0,3E05,188r9,3E05,-1,-1,1689037837680,>33,>33,188r9,9N81,-1,3E05,,188r9,-102,>33,3E05,>33,1080,>33,9N81,>33,9N81,36818,188r9,0,9N81,415583,>33,-132,1993,0,188r9,188r9,0,9N81,0.14172349470,3E05,9N81,9N81,188r9,1,9N81,188r9,9N81,uaend,0,188r9,188r9,188r9,9N81,-80,188r9,https://www.ups.com/track?loc=en_US&requester=ST/,9N81,188r9,sc:0,,9N81,>33,3E05,188r9,188r9,188r9,9N81,0,>33,1,,3E05,188r9,1382,-126,>33,0,3E05,9N81,,9N81,3E05,0,>33,>33,2281|15464,3E05,188r9,3E05,8,188r9,9N81,9N81,>33,-128,0,-1,-129,>33,opc:0,,188r9,9N81,0,>33,9N81,,9N81,3E05,-1,-124,-122,,9N81,,>33,3E05,-117,9N81,-114,>33,3E05,>33,dm_en,>33,9N81,9N81,18068,188r9,1920,3E05,188r9,3E05,188r9,>33,188r9,188r9,9N81,9N81,188r9, like Gecko) Chrome/111.0.0.0 Safari/537.36,0,zh-CN,>33,9N81,3E05,3E05,2,-108,>33,>33,9N81,3E05,188r9,>33,0,1778,bat:0,9N81,9N81,-106,3E05,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,-116,>33,0,>33,0;0,t_en,-112,0,>33,-999999,,0,1019,94,0;0,0,188r9,-123,-131,0,,9N81,1,3E05,>33,-119"
var cc = EncodeAlgorithm(aa, 3420984);
console.log(cc);

// var dd = DecodeAlgorithm(cc, 1268550)
// console.log(dd);