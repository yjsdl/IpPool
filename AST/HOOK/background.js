function openTab(){
    
    var newTab = browser.tabs.create({
        url:'https://www.baidu.com',
        active:true
    })
    newTab()
}

browser.browserAction.onClicked.addListener(openTab)