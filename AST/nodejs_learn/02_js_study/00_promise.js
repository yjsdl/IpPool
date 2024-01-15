// new Promise((resolve, reject) => {
//     setTimeout(function(){
//         console.log('执行1');
//         resolve('123456');
//         console.log('执行2');
//     },5000);
//     console.log('首先开始执行');
// }).then((data) => {
//     console.log('成功回调',data);
// })
// console.log('第二步执行');



// var p1 = new Promise(function(resolve, reject){
//     console.log('执行同步1');
//     setTimeout(function(){
//         console.log('执行p1开始');
//         reject('回调参数p1');
//         console.log('执行p1结束');
//     },1000)
// })

// var p2 = new Promise(function(resolve, reject){
//     console.log('执行同步2');
//     setTimeout(function(){
//         console.log('执行p2开始');
//         resolve(p1);
//         console.log('执行p2结束');
//     },3000)
// })
// p2.then(function (data){
//     console.log('执行p2回调');
//     console.log(data);
// },function (err){
//     console.log('执行p2错误');
//     console.log(err);
// });
// p1.catch(function (err){
//     console.log('catch', err);
// })

// p1.then(function(data){
//     console.log('执行p1回调');
//     console.log(data);
// },function(err){
//     console.log('执行p1错误');
//     console.log(err);
// })
// async function jtest() {
//     await p2()
// }









// var p1 = new Promise(function (resolve, reject) {
//     setTimeout(function () {
//      // 执行resolve函数后p1的状态 pending->fulfilled
//      // 然后执行p1成功时的回调函数 并传递参数
//       reject('1'); 
//     }, 1000);
//   })
  
// var p2 = p1.then(function (data) { // p1成时的回调函数
//     console.log("data", data);
//     return 'hello p2'; // 执行return语句后p2的状态pending->fulfilled 同时p2成功的回调函数会被调用
//     // 当前函数中 return 的结果就可以在后面的 then 中 function 接收到
//   }, function (err) { // p1失败时的回调函数
//     console.log("err", err);
//     return 'hello p2 nihao';
//   }); // 当前then返回一个新的promise:p2
  
// var p3 = p2.then(function (data) {  // p2成功时的回调函数
//     console.log("data", data);
//   }, function (err) { // p2失败时的回调函数
//     console.log("err", err);
//   })

function twst() {
    new Promise((resolve, reject) => {
        debugger;
    }).then(
        new Promise((resolve, reject) => {
        })
    )
}

function runasync(){
    var p1 = new Promise(function(resolve, reject){
        console.log('执行同步1');
        setTimeout(function(){
            console.log('执行p1开始');
            resolve('回调参数p1');
            console.log('执行p1结束');
        },1000)
    })
    return p1;
}
runasync().then(function(data) {
    console.log(data);
});