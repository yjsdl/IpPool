// import cycletls
const initCycleTLS = require('cycletls');
// Typescript: import initCycleTLS from 'cycletls';

(async () => {
    // Initiate CycleTLS
    const cycleTLS = await initCycleTLS();

    // Send request
    // const response = await cycleTLS('https://ja3er.com/json', {
    // for (var i=0; i<2; i++){
    //     const response = await cycleTLS('https://www.baidu.com/s?q1=&q2=杨成祥&q3=&q4=&gpc=stf&ft=&q5=&q6=neu.edu.cn&tn=baiduadv&pn=10', {
    //         body: '',
    //         ja3: '771,4865-4867-4866-49195-49199-52393-52392-49196-49200-49162-49161-49171-49172-51-57-47-53-10,0-23-65281-10-11-35-16-5-51-43-13-45-28-21,29-23-24-25-256-257,0',
    //         userAgent: 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:87.0) Gecko/20100101 Firefox/87.0',
    //         Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    //         // proxy: 'http://username:password@hostname.com:443'
    //     }, 'get');
    //
    //
    //     console.log(response);
    //     // console.log(response.body.search('杨成祥'));
    //     // if ('杨成祥' in response.body){
    //     //     console.log('成功')
    //     // }
    //     // Cleanly exit CycleTLS
    //     cycleTLS.exit();
    //
    // }
    const response = await cycleTLS('https://onlinelibrary.wiley.com/journal/16000463', {
        // body: '',
        ja3: '771,27242-4865-4866-4867-49195-49199-49196-49200-52393-52392-49171-49172-156-157-47-53,2570-0-23-65281-10-11-35-16-5-13-18-51-45-43-27-17513-6682-21,64250-29-23-24,0',
        UserAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        // proxy: 'http://username:password@hostname.com:443'
    }, 'get');

    console.log(response);

    // Cleanly exit CycleTLS
    cycleTLS.exit();
    // '771,4865-4867-4866-49195-49199-52393-52392-49196-49200-49162-49161-49171-49172-156-157-47-53,0-23-65281-10-11-35-16-5-34-51-43-13-45-28-21,29-23-24-25-256-257,0'
    // '771,27242-4865-4866-4867-49195-49199-49196-49200-52393-52392-49171-49172-156-157-47-53,2570-0-23-65281-10-11-35-16-5-13-18-51-45-43-27-17513-6682-21,64250-29-23-24,0'
    // '771,47802-4865-4866-4867-49195-49199-49196-49200-52393-52392-49171-49172-156-157-47-53,47802-0-23-65281-10-11-35-16-5-13-18-51-45-43-27-17513-43690-21,64250-29-23-24,0'
    // '771,56026-4865-4866-4867-49195-49199-49196-49200-52393-52392-49171-49172-156-157-47-53,10794-0-23-65281-10-11-35-16-5-13-18-51-45-43-27-17513-31354-21,64250-29-23-24,0'
    // '771,47802-4865-4866-4867-49195-49199-49196-49200-52393-52392-49171-49172-156-157-47-53,19018-0-23-65281-10-11-35-16-5-13-18-51-45-43-27-17513-60138-21,35466-29-23-24,0'
})();