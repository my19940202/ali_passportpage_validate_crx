
(function(){
    console.log('this background');
    // 1. collectData设置localsctorage
    // 2. 关闭tab页面
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
        console.log({[request.name]: request.type}, '{[request.name]: request.type}');
        chrome.storage.local.set({[request.name]: request.type}, () => {
            sendResponse('response data' + JSON.stringify(request));
            if (sender && sender.tab && sender.tab.id) {
                chrome.tabs.remove(sender.tab.id, () => {});
            }
        });
    });

})();
