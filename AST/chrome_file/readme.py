{
  // 清单文件的版本
  "manifest_version": 3,
  // 插件的名称
  "name": "all in plugin",
  // 插件的版本
  "version": "2.0.0",
  // 插件描述
  "description": "all in plugin",
  // 图标
  "icons": {
    "16": "assets/icon16.png",
    "48": "assets/icon48.png",
    "128": "assets/icon128.png"
  },
  //背景页,后台脚本引入,v2是scripts:[xxx,xxx],可以引入多个js文件,v3是service_worker：'xxx',只能引入一个js,v3版最大的改动应该就是这里了,扩展程序管理界面的插件的那个“背景页”也将变成“Service Worker”,改动之后background.js将和浏览器完全分离,即无法调用window和ducoment对象
  //可以看介绍：
  //1、//developer.chrome.com/docs/extensions/mv3/intro/mv3-migration/#background-service-workers；
  //2、//developer.chrome.com/docs/extensions/mv3/migrating_to_service_workers/
  "background": {
    "service_worker": "js/background.js"
  },
  "action": {
    "default_icon": {
      "19": "assets/icon19.png",
      "38": "assets/icon38.png"
    },
    "default_title": "all in plugin",
    "default_popup": "popup.html"
  },
  //注入脚本,值是个数组对象,可以有多个对象
  "content_scripts": [
    //每个对象代表一个注入的配置
    {
      //需要注入js脚本文件的指定页面
      "matches": ["http://*/*", "https://*/*"],
      "css": [],
      //需要在指定页面注入的js脚本文件
      "js": [
        "js/chunk-vendors.js",
        "js/jquery-1.8.3.js",
        "js/google-csdn.js",
        "js/monitor-help.js"
      ],
      //不允许注入js脚本文件的指定页面
      //  "exclude_matches": ["https://*.xxx.com/*"],
      //什么时候注入的js脚本,document_start=页面加载开始时,document_end=页面加载结束时
      "run_at": "document_start"
    }
  ],
  //API权限,需要使用某些API时需要设置该API权限才行
  "permissions": [
    "contextMenus",
    "tabs",
    "notifications",
    "webRequest",
    "storage"
  ],
  //主机权限,在背景页backgroud.js里面或者popup页面走请求时,请求域名的白名单权限,如果没添加的则请求会失败
  "host_permissions": ["http://*/*", "https://*/*"],
  //  免费广告位
  "homepage_url": "",
  // devtools栏页面
  "devtools_page": "devtools.html",
  //内容安全政策,V2的value是字符串,V3是对象
  "content_security_policy": {
    //原文：此政策涵盖您的扩展程序中的页面,包括 html 文件和服务人员；具体不是很明白,但是参数值得是self,即当前自己
    "extension_pages": "script-src 'self'; object-src 'self'"
  }
}


{
  "name": "Chrome插件V3",
  "version": "1.0",
  "description": "React开发chrome插件V3 Demo。",
  // Chrome Extension 版本号，3表示MV3
  "manifest_version": 3,
  // background script配置（根目录为最终build生成的插件包目录）
  "background": {
    "service_worker": "static/js/background.js"
  },
  // content script配置
  "content_scripts": [
    {
      // 应用于哪些页面地址（可以使用正则，<all_urls>表示匹配所有地址）
      "matches": ["<all_urls>"],
      // 注入到目标页面的css，注意不要污染目标页面的样式
      "css": ["static/css/content.css"],
      // 注入到目标页面js，这个js是在沙盒里运行，与目标页面是隔离的，没有污染问题。
      "js": ["static/js/content.js"],
      // 代码注入的时机，可选document_start、document_end、document_idle（默认）
      "run_at": "document_end"
    }
  ],
  // 申请chrome extension API权限
  "permissions": ["storage","declarativeContent"],
  // 插件涉及的外部请求地址，暂未发现影响跨域请求，猜测是用于上架商店时方便审核人员查阅
  "host_permissions":[],
  // 如果向目标页面插入图片或者js，需要在这里授权插件本地资源（以下仅为示例）。
  "web_accessible_resources": [
    {
      "resources": [ "/images/app.png" ],
      "matches": ["<all_urls>"]
    },
    {
      "resources": [ "insert.js" ],
      "matches": ["<all_urls>"]
    }
  ],
  // popup页面配置
  "action": {
    // popup页面的路径（根目录为最终build生成的插件包目录）
    "default_popup": "index.html",
    // 浏览器插件按钮的图标
    "default_icon": {
      "16": "/images/app.png",
      "32": "/images/app.png",
      "48": "/images/app.png",
      "128": "/images/app.png"
    },
    // 浏览器插件按钮hover显示的文字
    "default_title": "React CRX MV3"
  },
  // 插件图标，图省事的话，所有尺寸都用一个图也行
  "icons": {
    "16": "/images/app.png",
    "32": "/images/app.png",
    "48": "/images/app.png",
    "128": "/images/app.png"
  }
}