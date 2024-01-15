class AkamaiEncode {
    constructor() {
        this.CodeArray = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,0,1,-1,2,3,4,5,-1,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,-1,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91];
        this.CodeStr = " !#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~";
    }
    EncodeAlgorithm(plaintext, codenum) {
        var Brn;
        var Prn;
        var Zrn;
        var grn;
        var nums = new Array();
        var Arn = plaintext.split(",");
        for (grn = 0; grn < Arn.length; grn++) {
            var one = new Array();
            Brn = ((codenum >> 8) & 65535) % Arn.length;
            codenum *= 65793;
            codenum &= 4294967295;
            codenum += 4282663;
            Prn = (((codenum &= 8388607) >> 8) & 65535) % Arn.length;
            codenum *= 65793;
            codenum &= 4294967295;
            codenum += 4282663;
            codenum &= 8388607;
            // console.log(`'第${grn}次 -- Brn的值为${Brn} -- Prn的值为${Prn} -- 结果为${Arn[grn]}'`);
            console.log(`'第${grn}次 -- codenum的值为${codenum} -- 结果为${Brn}与${Prn}交换'`)
            Zrn = Arn[Brn];
            Arn[Brn] = Arn[Prn];
            Arn[Prn] = Zrn;
            one.push(Brn);
            one.push(Prn);
            nums.push(one)
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
    realEncodeAlgorithm(plaintext, codenum) {
        for (var JTn = "", nTn = 0; nTn < plaintext.length; nTn++) {
            var bTn = plaintext.charAt(nTn),
            hTn = (codenum >> 8) & 65535;
            codenum *= 65793,
            codenum &= 4294967295,
            codenum += 4282663,
            codenum &= 8388607;
            var fTn = this.CodeArray[plaintext.charCodeAt(nTn)];
            if ("function" == typeof bTn.codePointAt) {
                var ETn = bTn.codePointAt(0);
                (ETn >= 32) && (ETn < 127) && (fTn = this.CodeArray[ETn]);  // 码表数组可以进一步还原
            };
            if (fTn >= 0) {
                fTn += hTn % this.CodeStr.length,
                fTn %= this.CodeStr.length,
                bTn = this.CodeStr[fTn];
            };
            JTn += bTn;
        }
        return JTn;
    };
}

/**
 * EncodeAlgorithm
 * 输入 
 * 参数1: 2,188r9,3E05,9N81,>33,2,188r9,3E05,9N81,>33,7a74G7m23Vrp0o5c934382G1LLQhT2XoNiC8FE50EPbQ==,188r9,3E05,9N81,>33,149362,188r9,3E05,9N81,>33,-100,188r9,3E05,9N81,>33,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36,uaend,12147,20030107,zh-CN,Gecko,5,0,0,0,415583,0,1920,1040,1920,1080,1920,969,1920,,cpen:0,i1:0,dm:0,cwen:0,non:1,opc:0,fc:0,sc:0,wrc:1,isc:0,vib:1,bat:0,x11:0,x12:1,8100,0.14172349470,844518918840,0,loc:,188r9,3E05,9N81,>33,-105,188r9,3E05,9N81,>33,0,-1,0,0,1382,1382,0;0,-1,0,0,1778,1019,0;,188r9,3E05,9N81,>33,-108,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-101,188r9,3E05,9N81,>33,do_en,dm_en,t_en,188r9,3E05,9N81,>33,-110,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-117,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-109,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-102,188r9,3E05,9N81,>33,0,-1,0,0,1382,1382,0;0,-1,0,0,1778,1019,0;,188r9,3E05,9N81,>33,-111,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-114,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-103,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-106,188r9,3E05,9N81,>33,0,0,188r9,3E05,9N81,>33,-115,188r9,3E05,9N81,>33,1,32,32,0,0,0,0,1993,0,1689037837680,-999999,18068,0,0,3011,0,0,1995,0,0,F2EFED842C6A97F8E7973146FB1BB616~-1~YAAQmx4gFwdixJ2IAQAA44Ff1wodNU42/7GPuZZYZyM/68bs/5YGddqgPgr+LLgueD5I7M8i8iRDgP3WT6kWeYj4VGnZvWMp+D5nS4wN0o6CA43OqxkqadecQLCo2eM+BJU7L5V2yA8cHn6Evhx3U64BYu3j4GuMqQ6NnqL97tWYr/peOR5tzS60HQK4rRb3glT6PMnNHo7Kq0AUvEuHxrMh182mnM6J6VXjAJmKzfqQEDl2QyBG76LQAngS5UJHlq6U7NfB97qrSkMzaGhZEWbdIZF0otLUg516EJ6kM4DvPdWpXtXBc1ScBQHh/3XUqnKTvTfm4cGewBUsx7fsDQvsAwhtzXkhAW3Y9qJ98VaMnBdBKnLNJE+NX46OyT4SU/cXtcKb5RReGay5yLuBLQ==~-1~-1~-1,36818,-1,-1,30261693,PiZtE,109580,77,0,-1,0,188r9,3E05,9N81,>33,-112,188r9,3E05,9N81,>33,https://www.ups.com/track?loc=en_US&requester=ST/,188r9,3E05,9N81,>33,-119,188r9,3E05,9N81,>33,-1,188r9,3E05,9N81,>33,-122,188r9,3E05,9N81,>33,0,0,0,0,1,0,0,188r9,3E05,9N81,>33,-123,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-124,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-126,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-127,188r9,3E05,9N81,>33,8,188r9,3E05,9N81,>33,-128,188r9,3E05,9N81,>33,,,,188r9,3E05,9N81,>33,-131,188r9,3E05,9N81,>33,,,,,188r9,3E05,9N81,>33,-132,188r9,3E05,9N81,>33,,,188r9,3E05,9N81,>33,-133,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-70,188r9,3E05,9N81,>33,-1,188r9,3E05,9N81,>33,-80,188r9,3E05,9N81,>33,94,188r9,3E05,9N81,>33,-90,188r9,3E05,9N81,>33,1,4562,2,2281|15464,188r9,3E05,9N81,>33,-116,188r9,3E05,9N81,>33,0,188r9,3E05,9N81,>33,-129,188r9,3E05,9N81,>33,
 * 参数2: 3420984
 * 输出
 * 3E05,3E05,188r9,12147,9N81,,0,188r9,1040,0,188r9,1920,0;,9N81,>33,3E05,3E05,3E05,188r9,9N81,3E05,9N81,3E05,149362,>33,3E05,30261693,>33,vib:1,>33,3E05,20030107,3E05,8100,loc:,>33,,>33,-127,188r9,1920,3E05,,77,9N81,>33,9N81,i1:0,188r9,2,non:1,9N81,fc:0,3E05,32,isc:0,32,9N81,4562,>33,0,2,188r9,>33,9N81,0;,3E05,3E05,-115,>33,188r9,3E05,188r9,188r9,9N81,>33,188r9,-110,>33,do_en,188r9,>33,>33,3E05,>33,188r9,3E05,Gecko,-90,9N81,3E05,0,0,,9N81,>33,-101,844518918840,9N81,9N81,,3E05,3E05,1382,9N81,>33,188r9,3E05,3E05,0,cpen:0,188r9,dm:0,5,188r9,188r9,9N81,3011,7a74G7m23Vrp0o5c934382G1LLQhT2XoNiC8FE50EPbQ==,9N81,3E05,188r9,9N81,,9N81,3E05,3E05,9N81,9N81,188r9,>33,-100,>33,>33,x12:1,3E05,>33,188r9,3E05,-1,-133,188r9,1778,9N81,0,0,0,188r9,>33,188r9,188r9,cwen:0,3E05,1382,188r9,-105,0,3E05,>33,0,1995,3E05,0,,>33,>33,0,188r9,188r9,>33,,188r9,0,9N81,3E05,188r9,188r9,3E05,1920,,188r9,188r9,3E05,>33,,-103,9N81,-1,>33,1382,-1,F2EFED842C6A97F8E7973146FB1BB616~-1~YAAQmx4gFwdixJ2IAQAA44Ff1wodNU42/7GPuZZYZyM/68bs/5YGddqgPgr+LLgueD5I7M8i8iRDgP3WT6kWeYj4VGnZvWMp+D5nS4wN0o6CA43OqxkqadecQLCo2eM+BJU7L5V2yA8cHn6Evhx3U64BYu3j4GuMqQ6NnqL97tWYr/peOR5tzS60HQK4rRb3glT6PMnNHo7Kq0AUvEuHxrMh182mnM6J6VXjAJmKzfqQEDl2QyBG76LQAngS5UJHlq6U7NfB97qrSkMzaGhZEWbdIZF0otLUg516EJ6kM4DvPdWpXtXBc1ScBQHh/3XUqnKTvTfm4cGewBUsx7fsDQvsAwhtzXkhAW3Y9qJ98VaMnBdBKnLNJE+NX46OyT4SU/cXtcKb5RReGay5yLuBLQ==~-1~-1~-1,,188r9,>33,109580,-109,wrc:1,3E05,0,9N81,3E05,9N81,,969,PiZtE,9N81,9N81,0,9N81,>33,-1,3E05,3E05,0,3E05,0,3E05,-111,>33,>33,>33,1019,-70,9N81,0,0,3E05,x11:0,0,3E05,188r9,3E05,-1,-1,1689037837680,>33,>33,188r9,9N81,-1,3E05,,188r9,-102,>33,3E05,>33,1080,>33,9N81,>33,9N81,36818,188r9,0,9N81,415583,>33,-132,1993,0,188r9,188r9,0,9N81,0.14172349470,3E05,9N81,9N81,188r9,1,9N81,188r9,9N81,uaend,0,188r9,188r9,188r9,9N81,-80,188r9,https://www.ups.com/track?loc=en_US&requester=ST/,9N81,188r9,sc:0,,9N81,>33,3E05,188r9,188r9,188r9,9N81,0,>33,1,,3E05,188r9,1382,-126,>33,0,3E05,9N81,,9N81,3E05,0,>33,>33,2281|15464,3E05,188r9,3E05,8,188r9,9N81,9N81,>33,-128,0,-1,-129,>33,opc:0,,188r9,9N81,0,>33,9N81,,9N81,3E05,-1,-124,-122,,9N81,,>33,3E05,-117,9N81,-114,>33,3E05,>33,dm_en,>33,9N81,9N81,18068,188r9,1920,3E05,188r9,3E05,188r9,>33,188r9,188r9,9N81,9N81,188r9, like Gecko) Chrome/111.0.0.0 Safari/537.36,0,zh-CN,>33,9N81,3E05,3E05,2,-108,>33,>33,9N81,3E05,188r9,>33,0,1778,bat:0,9N81,9N81,-106,3E05,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,-116,>33,0,>33,0;0,t_en,-112,0,>33,-999999,,0,1019,94,0;0,0,188r9,-123,-131,0,,9N81,1,3E05,>33,-119
 */


/**
 * realEncodeAlgorithm
 * 输入 
* 参数1: 3E05,3E05,188r9,12147,9N81,,0,188r9,1040,0,188r9,1920,0;,9N81,>33,3E05,3E05,3E05,188r9,9N81,3E05,9N81,3E05,149362,>33,3E05,30261693,>33,vib:1,>33,3E05,20030107,3E05,8100,loc:,>33,,>33,-127,188r9,1920,3E05,,77,9N81,>33,9N81,i1:0,188r9,2,non:1,9N81,fc:0,3E05,32,isc:0,32,9N81,4562,>33,0,2,188r9,>33,9N81,0;,3E05,3E05,-115,>33,188r9,3E05,188r9,188r9,9N81,>33,188r9,-110,>33,do_en,188r9,>33,>33,3E05,>33,188r9,3E05,Gecko,-90,9N81,3E05,0,0,,9N81,>33,-101,844518918840,9N81,9N81,,3E05,3E05,1382,9N81,>33,188r9,3E05,3E05,0,cpen:0,188r9,dm:0,5,188r9,188r9,9N81,3011,7a74G7m23Vrp0o5c934382G1LLQhT2XoNiC8FE50EPbQ==,9N81,3E05,188r9,9N81,,9N81,3E05,3E05,9N81,9N81,188r9,>33,-100,>33,>33,x12:1,3E05,>33,188r9,3E05,-1,-133,188r9,1778,9N81,0,0,0,188r9,>33,188r9,188r9,cwen:0,3E05,1382,188r9,-105,0,3E05,>33,0,1995,3E05,0,,>33,>33,0,188r9,188r9,>33,,188r9,0,9N81,3E05,188r9,188r9,3E05,1920,,188r9,188r9,3E05,>33,,-103,9N81,-1,>33,1382,-1,F2EFED842C6A97F8E7973146FB1BB616~-1~YAAQmx4gFwdixJ2IAQAA44Ff1wodNU42/7GPuZZYZyM/68bs/5YGddqgPgr+LLgueD5I7M8i8iRDgP3WT6kWeYj4VGnZvWMp+D5nS4wN0o6CA43OqxkqadecQLCo2eM+BJU7L5V2yA8cHn6Evhx3U64BYu3j4GuMqQ6NnqL97tWYr/peOR5tzS60HQK4rRb3glT6PMnNHo7Kq0AUvEuHxrMh182mnM6J6VXjAJmKzfqQEDl2QyBG76LQAngS5UJHlq6U7NfB97qrSkMzaGhZEWbdIZF0otLUg516EJ6kM4DvPdWpXtXBc1ScBQHh/3XUqnKTvTfm4cGewBUsx7fsDQvsAwhtzXkhAW3Y9qJ98VaMnBdBKnLNJE+NX46OyT4SU/cXtcKb5RReGay5yLuBLQ==~-1~-1~-1,,188r9,>33,109580,-109,wrc:1,3E05,0,9N81,3E05,9N81,,969,PiZtE,9N81,9N81,0,9N81,>33,-1,3E05,3E05,0,3E05,0,3E05,-111,>33,>33,>33,1019,-70,9N81,0,0,3E05,x11:0,0,3E05,188r9,3E05,-1,-1,1689037837680,>33,>33,188r9,9N81,-1,3E05,,188r9,-102,>33,3E05,>33,1080,>33,9N81,>33,9N81,36818,188r9,0,9N81,415583,>33,-132,1993,0,188r9,188r9,0,9N81,0.14172349470,3E05,9N81,9N81,188r9,1,9N81,188r9,9N81,uaend,0,188r9,188r9,188r9,9N81,-80,188r9,https://www.ups.com/track?loc=en_US&requester=ST/,9N81,188r9,sc:0,,9N81,>33,3E05,188r9,188r9,188r9,9N81,0,>33,1,,3E05,188r9,1382,-126,>33,0,3E05,9N81,,9N81,3E05,0,>33,>33,2281|15464,3E05,188r9,3E05,8,188r9,9N81,9N81,>33,-128,0,-1,-129,>33,opc:0,,188r9,9N81,0,>33,9N81,,9N81,3E05,-1,-124,-122,,9N81,,>33,3E05,-117,9N81,-114,>33,3E05,>33,dm_en,>33,9N81,9N81,18068,188r9,1920,3E05,188r9,3E05,188r9,>33,188r9,188r9,9N81,9N81,188r9, like Gecko) Chrome/111.0.0.0 Safari/537.36,0,zh-CN,>33,9N81,3E05,3E05,2,-108,>33,>33,9N81,3E05,188r9,>33,0,1778,bat:0,9N81,9N81,-106,3E05,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML,-116,>33,0,>33,0;0,t_en,-112,0,>33,-999999,,0,1019,94,0;0,0,188r9,-123,-131,0,,9N81,1,3E05,>33,-119
* 参数2: 4605506
* 输出
* fV&98tKhD%I9Zc40~n!/s6=+z_W<,[BVt?EM_4W@ud-p>{^F)j3N#[UA>6V-sDDNpWL|wRtaR(dS%tr3{o3]svka)ZjJU>p5P^]lyZ+:VV3)X<UznV2H8n%)uu~$+aZ{K=>T Z0.O>)G X8GC;uS2sut-(I;I/(J~2|J^a+&px8<e+C*}|Fx$flg&6QSXEJ!0ST*SC|}t4geG6t@9VI]Q;`_ %YtrbWebzzN+*qJca]i--ZXWbYC-$.y>~9Bbk[Jz3Hp+-pL:QJcAM@disbOTOd ?[%?WTaF.M<9i$jwl7JE61l[m%*WeZ+_v9[zAHZ:1Ed=%42$IWi7{ ]Nj,SeuyUo|_+_;,?x$:eF3A;5o}&LLZ9@M}`/ZJ2LOp]z3_hsd%FI*A@]*AHi %qh,cX2k}R1e(nQ?T t1b3#m4[cxBW>1U6/]31%[3SoY:zJ&@cZ`-heY$/[}CfBJfWbNiph4i8lJ)wb4Ps{8c552]lFT@|;D_smH#4@qmsJ:+iN~O;0AxUR8nyZO#B#@pJ|Ni,d1LCtu[^p&Ay4Eblx(erKsi&j5PfG_>tj{pks1k*Yqi~#J,!.GiE/ej#K1*nHh?l+X%1)>zpY@(xs7%xF9v:0m[ox>{VU:(Run;6s$6&znOKO#kc<BsG=.uC;eNmh/rM`G!3#/.<7=ud:ORAZ#mJ2zquT5l;UZF~M9U&}7HAGB/$I vzNm]5.[ acH+Rty5MtoUhjz0FDdNwp>SF!D5wxLpLWB5D10j]!}<DEv*;ATD@!YVfAnFTP=PEW7.X@RP0eogu{NZ$6V=:%zh%V.$y/#3{E%*M::R?)_)6P+:F|%3:tUi!lC+A>Fbm2ie: LZAv/9`IEW*KtK~UH +jLLR]d ,FADer#LA*xCi(s}[dFFP6%Jz^PT[-!<=[hfj@q0|o/<f&h$$*o{3&l>Rb8_Ll.Pp*(9!wBhncn5p-i0j:somQI0nn!aROP(FF.iJ[tK01d9KR2g/`w3`]iH>~z8G:&8Y5c:IHLn,5gp?.%l*[U <wxc.9##Zhn2{51yxZc6ND}k @V&8S-{]{#3`=&*!6.k>g$f(8pLR`@b>oYh.Es|i~EZUS}&!6Q_syb7svrqH:zN`[o;aQ{ &jkk|/t/[}- ehp;-IyAfXpAOAG!Z00=NqjBK^1Mr(z$#1kU+z@WT`&uA93axD rG0VN}G~;C#`4kRYS4u73IrhSAhuTH^J8AtQxO/`xD?aTv1DWXa}x(lYB2EI%%(YQUIr~2Tm#E~zQw&O_^E:xks}%i#(J,5kVp>L]|3e[^,^1-VFZ$sHmjKl`@w+;hCjf9(9gPigD.QOOfCDxRQ8A&]B]uY!O?}(6>Ufs7[}5Kwo7i6BRuzb6%m^Tcp?R}2NI`3!@Y:Sw[su+ 0&7kJcvXIPbkr<PR_{4T}f&:|m#i z8TPQOB=K[D)RV}4,h3YaFnlM^%rohZ{%FY+rr_^l6)t+=sBb=g6ql*oo5c^5IFh|Io{&$qj9bRYs-P(f,dFh*643[9zk(3TnYQux6,-I+@uESy[L,]1f#I^LyAOJZE:M+Wd)7.7V2E5g%k@+cP b(QLM#qg_wGb)U#Tuj3!iXLS :0TSL{X;k9ANsqmj@U)KD[0=l0}bC[U.NA$)TRFxJv/T*fr&Kn?zv~dwHVfR4:]?h.?2ztjd}Wd!h_h LdV|t:}Pz2B/ @O(SF@K2v{gN3LAP1W[K.^.nK6jGVzbMy.zWB,;D53%dcn%y!QX#UK.$5NvUo4I|>_K=;k>(GM7pbg%$#;#i:(|s1So_!P~@g,/gMos*M0-xk;h_f9M{qe&:(vYi&L?:jF0s|<(<TueU2nB L#@kqs[YAo@/^2.Gs5FY$3%*_ms_S-r}dTtP*qRUK^Z?h;^^7fvs|)LX$7#K4s^j]U,#n*T3u23uL(0G?rnc$=^|`S~h ZB:rA{!w$!<>TH9$ay0sWo|1Kg.~y><J45:Q2r*p1}LBrZfD7IeKBVW% m;q/IUgnHizldg=%$CmmjljFlB,_><xFm0^/ur$jp3YG,DKko=Kkk#pe-`IL^y?R8RixK_)%{%}mb.*DS <tj(hn_tpd&?>M.QF-Pi~|}V) |4;f5^xBV!.v>us*C_=rp5$E6Mx%yeW>7Ea:V4R-:UQbGn}}[l^/V: ZG)rdxP7Q?[mV0b}Hj?6M&VrzYce81#lF;fMMZ@y08H V$!<w1bs}EH^yAmaNM8pyX4j*p%W{?]t[45I3R%CTo$6=o:2{4DlVN*|=o$z7FrgM-uL7^>NjOq;Y@0v6<5?x#Z;]}]D|I<@Oup>= G_{z{0V=!3l)x3w!ZO~->)Vhb,~NVM0ZDfD+/IxsQ8UPorglVDwML?i^C9Y+2z3Q:[-B;c!ylqx-/]DYGVP0{|Lr&xgXUEnk_x`lgPILf*2P^ lXa`U;B3bD9u{2lQ_7)f7)U:&-+=Eo}.A~r&U0|7iD@yC0<7D#5eBGZKzzdjy^&V`}(#fQszd,42?;WUgA@{[$3%pkw;Ev?_x?CF6*sX,ozy2+GFb[U?(<jmCHRz2j:[)D^^N?`~gV
*/
var aa = "2,188r9,3E05,9N81,>33,2,188r9,3E05,9N81,>33,7a74G7m23Vrp0o5c934382G1LLQhT2XoNiC8FE50EPbQ==,188r9,3E05,9N81,>33,149362,188r9,3E05,9N81,>33,-100,188r9,3E05,9N81,>33,Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36,uaend,12147,20030107,zh-CN,Gecko,5,0,0,0,415583,0,1920,1040,1920,1080,1920,969,1920,,cpen:0,i1:0,dm:0,cwen:0,non:1,opc:0,fc:0,sc:0,wrc:1,isc:0,vib:1,bat:0,x11:0,x12:1,8100,0.14172349470,844518918840,0,loc:,188r9,3E05,9N81,>33,-105,188r9,3E05,9N81,>33,0,-1,0,0,1382,1382,0;0,-1,0,0,1778,1019,0;,188r9,3E05,9N81,>33,-108,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-101,188r9,3E05,9N81,>33,do_en,dm_en,t_en,188r9,3E05,9N81,>33,-110,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-117,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-109,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-102,188r9,3E05,9N81,>33,0,-1,0,0,1382,1382,0;0,-1,0,0,1778,1019,0;,188r9,3E05,9N81,>33,-111,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-114,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-103,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-106,188r9,3E05,9N81,>33,0,0,188r9,3E05,9N81,>33,-115,188r9,3E05,9N81,>33,1,32,32,0,0,0,0,1993,0,1689037837680,-999999,18068,0,0,3011,0,0,1995,0,0,F2EFED842C6A97F8E7973146FB1BB616~-1~YAAQmx4gFwdixJ2IAQAA44Ff1wodNU42/7GPuZZYZyM/68bs/5YGddqgPgr+LLgueD5I7M8i8iRDgP3WT6kWeYj4VGnZvWMp+D5nS4wN0o6CA43OqxkqadecQLCo2eM+BJU7L5V2yA8cHn6Evhx3U64BYu3j4GuMqQ6NnqL97tWYr/peOR5tzS60HQK4rRb3glT6PMnNHo7Kq0AUvEuHxrMh182mnM6J6VXjAJmKzfqQEDl2QyBG76LQAngS5UJHlq6U7NfB97qrSkMzaGhZEWbdIZF0otLUg516EJ6kM4DvPdWpXtXBc1ScBQHh/3XUqnKTvTfm4cGewBUsx7fsDQvsAwhtzXkhAW3Y9qJ98VaMnBdBKnLNJE+NX46OyT4SU/cXtcKb5RReGay5yLuBLQ==~-1~-1~-1,36818,-1,-1,30261693,PiZtE,109580,77,0,-1,0,188r9,3E05,9N81,>33,-112,188r9,3E05,9N81,>33,https://www.ups.com/track?loc=en_US&requester=ST/,188r9,3E05,9N81,>33,-119,188r9,3E05,9N81,>33,-1,188r9,3E05,9N81,>33,-122,188r9,3E05,9N81,>33,0,0,0,0,1,0,0,188r9,3E05,9N81,>33,-123,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-124,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-126,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-127,188r9,3E05,9N81,>33,8,188r9,3E05,9N81,>33,-128,188r9,3E05,9N81,>33,,,,188r9,3E05,9N81,>33,-131,188r9,3E05,9N81,>33,,,,,188r9,3E05,9N81,>33,-132,188r9,3E05,9N81,>33,,,188r9,3E05,9N81,>33,-133,188r9,3E05,9N81,>33,,188r9,3E05,9N81,>33,-70,188r9,3E05,9N81,>33,-1,188r9,3E05,9N81,>33,-80,188r9,3E05,9N81,>33,94,188r9,3E05,9N81,>33,-90,188r9,3E05,9N81,>33,1,4562,2,2281|15464,188r9,3E05,9N81,>33,-116,188r9,3E05,9N81,>33,0,188r9,3E05,9N81,>33,-129,188r9,3E05,9N81,>33,"
var bb = 3420984;
var cc = new AkamaiEncode();
var res = cc.EncodeAlgorithm(aa, bb);
console.log(res);