
// 后台监听事件消息
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    let requestType = message.type;

    switch (requestType) {
        // 检测是否是扩展开启状态
        case "checkFlag":
            // sender.id 获取应用id
            // sender.url 获取tab url
            // sender.tab 非popup获取tab信息
            console.log(sender);
            sendResponse({ "runtime": true });
            break;

        case "sendRequest":
            console.log(sender);
            chrome.tabs.sendMessage(sender.tab.id, {
                type: "checkTab",
                message: "send tab a message"
            });
            break;

        // 发布个notify
        case "notify":
            notify(sender);
            sendResponse({ "complete": 1 });
            break;

        case "getUserData":
            (async () => {
                const data = await getUserData();
                sendResponse({ "complete": 1, "data": data });
            })();
            break;
    }
    // 这里一定要写个，保证async异步执行完成
    return true;
});



// 注意，必须设置了run_at=document_start 此段代码才会生效
// document.addEventListener("DOMContentLoaded", function () {
//     // 注入自定义JS
//     initCustomPanel();
// });
  
function initCustomPanel() {
    let s_top_wrap = document.getElementById("s_top_wrap");
    s_top_wrap && s_top_wrap.remove();
    var panel = document.createElement("div");
    panel.className = "chrome-plugin-demo-panel";
    panel.innerHTML = `
            <h2> 演示区：</h2>
        <div>你也可以删除这段代码注入，在自己的网站中调用：javascript:window.postMessage({ cmd: "invoke", code: "getBuffCookie" }, "*")</div>
        <div>调用完本段代码之后，buff的cookie便会存储到localStore中</div>
            <div class="btn-area" style="margin-bottom:100px">
                <a id="btn_get_buff_cookie" href='javascript:window.postMessage({ cmd: "invoke", code: "getBuffCookie" }, "*")'>点我获取BuffCookie</a><br>
                <a id="btn_get_steam_cookie" href='javascript:window.postMessage({ cmd: "invoke", code: "getSteamCookie" }, "*")'>点我获取SteamCookie</a><br>
            </div>

        `;
    // panel.style = "display:none;";
    document.body.appendChild(panel);
};

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action == 'getCookie'){
        chrome.cookies.getAll({domain: request.domain}, function(cookies){
            sendResponse({cookies:cookies,request:request})
        });
    }
    return true;
});

// 插件安装监听事件
chrome.runtime.onInstalled.addListener(() => {

    // 清除插件所有的本地数据
    chrome.storage.local.clear();
    // local 和 sync 区别在于，sync会同步到chrome登录用户
    chrome.storage.sync.clear();

    // 设置初始数据
    chrome.storage.local.set({
        "demo": "demo 数据",
        "env": "dev"
    }, function () {
        console.log("chrome extension is install.");
    });
});
chrome.runtime.onInstalled.addListener(() => {
    chrome.notifications.create(null, {
        type: 'basic',
        iconUrl: 'icon.png',
        title: 'demo',
        message: '下载插件已启动'
    });
});