
(function() {
    function formatData(obj) {
        let ret = '';
        var keyArr = ['通过银行卡+手机', '通过手机绑定', '不存在', '冻结', '密保', '人工服务', '支付宝风险', '通过邮箱验证码+手机'];
        for (let key in obj) {
            const element = obj[key];
            ret += `${key},${keyArr[element]}\n`;
        }
        return ret;
    }
    // 输入
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
                let msg = '要批量找回的用户名 ' + list.join('\n');
                let result = confirm(msg);

                // 逐个打开页面
                let site = 'https://passport.taobao.com/ac/password_find.htm?spm=a2107.1.0.0.1d6e11d9jluVlR&from_site=0&login_id=&lang=zh_CN&app_name=&tracelog=signin_main_pass';
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
        // 点击获取数据结果
        let copyBtn = document.getElementById('copy_data');
        copyBtn.onclick = function () {
            chrome.storage.local.get(null, value => {
                alert(formatData(value));
            });
        };

        // 清空已抓取数据
        let clearBtn = document.getElementById('popup_clear');
        clearBtn.onclick = function () {
            chrome.storage.local.clear();
            alert('抓取数据已清空');
        };
    });
})();

