
(function(){
    document.addEventListener('DOMContentLoaded', () => {
        let submitBtn = document.getElementById('popup_submit');
        submitBtn.onclick = function () {
            let content = document.getElementById('content').value;
            if (content) {
                let list = [];
                content.split(/\n/g).forEach(item => {
                    let content = item.split(/\s/g);
                    list.push({
                        id: content[0],
                        name: content[1]
                    });
                });
                // 提示 && 校验
                let msg = JSON.stringify(list)
                    .replace(/id/g, '身份证')
                    .replace(/name/g, '姓名');
                let result = confirm(msg);

                // 逐个打开页面
                let site = 'https://passport.taobao.com/ac/nick_find.htm?spm=a2107.1.0.0.233c11d9Qdjxie&from_site=0&lang=zh_CN&app_name=tbTop';
                if (result) {
                    for (let idx = 0; idx < list.length; idx++) {
                        const element = list[idx];
                        chrome.tabs.create({
                            url: `${site}&mcid=${element.id}&mcname=${element.name}`
                        });
                    }
                }
            }
        };
    });
})();

