/**
 * @file 收集数据并写入
 * @author xishengbo
 */

function getQueryNameValue(query, key) {
    let ret = '';
    if (query.indexOf(key) !== -1) {
        ret = query.split(`${key}=`)[1];
        ret = ret.split('&')[0];
    }
    return ret;
}

// 0.通过银行卡+手机
// 1.通过手机绑定
// 2.不存在
// 3.冻结
// 4.密保
// 5.人工服务
// 6.支付宝风险
// 7.通过邮箱验证码+手机
function collectData(usrname) {
    if (document.referrer) {
        let ret = {name: usrname};
        let text = document.body.innerText;
        // 判断用户类型
        if (location.pathname === '/ac/password_find.htm') {
            if (text.indexOf('该账户不存在，请重新输入') !== -1) {
                ret.type = 2;
            }
        }
        else if (location.pathname === '/ac/to_iv.htm') {
            // 是否有iframe1
            let frame = document.getElementsByTagName('iframe');
            if (frame[0] && frame[0].name === 'iframe1') {
                let innerText = window.frames['iframe1'].document.body.innerText;
                if (innerText.indexOf('通过 手机验证码+证件') !== -1) {
                    ret.type = 0;
                }
                if (innerText.indexOf('通过 手机验证码+证件') === -1
                    && innerText.indexOf('通过 联系客服') !== -1) {
                    ret.type = 5;
                }
                if (innerText.indexOf('手机验证码验证') !== -1) {
                    ret.type = 1;
                }
                if (innerText.indexOf('通过 邮箱验证码+输入手机') !== -1) {
                    ret.type = 7;
                }
            }
            else {
                if (text.indexOf('为保证账户正常使用，请更换手机后再重置密码')!== -1) {
                    ret.type = 4;
                }
            }
        }
        else if (location.hostname === 'accounts.alipay.com') {
            if (text.indexOf('您的账户被冻结，暂时不能访问此页面') !== -1) {
                ret.type = 3;
            }
            else if (text.indexOf('重置登录密码，请选择重置方式') !== -1) {
                ret.type = 6;
            }
        }
        console.log(ret, '用户类型结果数据');
        // 设置 localstorage
        // if (ret.usrname && ret.hasOwnProperty('type')) {
        //     let userData = localStorage.getItem('userData');

        // }
    }
}

(function () {
    // 获取用户名
    let usrname = getQueryNameValue(document.referrer, 'mcid');
    if (usrname) {
        setTimeout(() => {
            console.log('collectData');
            collectData(usrname);
        }, 5000);
    }
})();