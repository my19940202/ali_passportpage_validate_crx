
(function(){
    console.log('this background');
    function openTab(id) {
        let site = 'https://passport.taobao.com/ac/password_find.htm?spm=a2107.1.0.0.1d6e11d9jluVlR&from_site=0&login_id=&lang=zh_CN&app_name=&tracelog=signin_main_pass';
        chrome.tabs.create({
            url: `${site}&mcid=${id}`
        });
    }

    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        if (request.name && request.type >= 0) {
            chrome.storage.local.set({[request.name]: request.type}, () => {
                sendResponse('response data' + JSON.stringify(request));
                // 更新缓存=>打开新页面 关闭老页面
                if (sender && sender.tab && sender.tab.id) {
                    chrome.storage.local.get(['tmpUserList'], userList => {
                        let tmpArr = userList && userList.tmpUserList;
                        if (tmpArr instanceof Array) {
                            if (tmpArr.length >= 1) {
                                tmpArr.shift();
                                chrome.storage.local.set({tmpUserList: tmpArr}, () => {
                                    if (tmpArr[0]) {
                                        openTab(tmpArr[0]);
                                    }
                                });
                            }
                            else {
                                chrome.notifications.create(null, {
                                    type: 'basic',
                                    iconUrl: 'icon.png',
                                    title: '抓取任务结束',
                                    message: '抓取任务结束'
                                });
                            }
                        }
                    });
                    chrome.tabs.remove(sender.tab.id, () => {});
                }
                // 打开新页面
    
            });
        }
    });
})();
