
(function(){
    document.addEventListener('DOMContentLoaded', () => {
        let submitBtn = document.getElementById('popup_submit');
        submitBtn.onclick = function () {
            let content = document.getElementById('content').value;
            if (content) {
                let list = [];
                content.split(/\n/g).forEach(item => {
                    list.push(item.replace(/\s/g, ''));
                });
                // 提示 && 校验
                let msg = '要批量找回的用户名 ' + list.join(',');
                let result = confirm(msg);

                // 逐个打开页面
                let site = 'https://passport.taobao.com/ac/password_find.htm?spm=a2107.1.0.0.609b11d9jv6J8P&from_site=0&login_id=asdfasd&lang=zh_CN&app_name=taobaoindex&tracelog=signin_main_pass';
                if (result) {
                    for (let idx = 0; idx < list.length; idx++) {
                        const element = list[idx];
                        chrome.tabs.create({
                            url: `${site}&mcid=${element}`
                        });
                    }
                }
            }
        };
    });
})();

