# 自动触发找回密码页面的校验的chrome插件
## 思路
- 刚开始采取puppeteer去模拟点击
- chrome extension方案
> https://passport.taobao.com/ac/nick_find.htm?spm=a2107.1.0.0.233c11d9Qdjxie&from_site=0&lang=zh_CN&app_name=tbTop

## 2019-06-02 优化
> 在puppeteer,phathomjs等爬虫中校验不能输入通过（估计是阿里的服务中有识别爬虫相关的代码）
### 优化思路
- popout的 html 搞一个textarea里面
id name,id name,id name 然后一次性打开多个页面
    - popput里面接受到输入后 需要一次性打开多个页面
    - 依次打开多个页面需要按照输入的顺序
- 页面载入过程中，先把姓名和输入框都填写一下，然后在进行校验


## 2019-06-23 优化
> 本次需求
黑产客户那边有百万个帐号，目前是计划用插件的形式，手动输入所有帐号的类型
- 输入（帐号id）
```
通过银行卡+手机: johannes1025@qq.com
通过手机绑定: lixue13627718256@qq.com
不存在: zhefeng7676@qq.com
冻结: yangfengyi88103@qq.com
密保: ly568177964@qq.com
人工服务: lovegufangliang@qq.com
支付宝风险: www.912498286@qq.com
通过邮箱验证码+手机: lfp0815@qq.com
```
- 输出形式（账户信息类型）
    - 通过银行卡+手机
        window.frames["iframe1"].document.body.innerText.indexOf('通过 手机验证码+证件')
    - 通过手机绑定
        window.frames["iframe1"].document.body.innerText.indexOf('手机验证码验证')
    - 不存在
        document.body.innerText.indexOf('该账户不存在，请重新输入')
    - 冻结
        document.body.innerText.indexOf('您的账户被冻结，暂时不能访问此页面')
    - 密保
        document.body.innerText.indexOf('为保证账户正常使用，请更换手机后再重置密码')
    - 人工服务
        window.frames["iframe1"].document.body.innerText.indexOf('通过 联系客服') && window.frames["iframe1"].document.body.innerText.indexOf('通过 手机验证码+证件') === -1
    - 支付宝风险
        document.body.innerText.indexOf('重置登录密码，请选择重置方式')
    - 通过邮箱验证码+手机
        document.body.innerText.indexOf('通过 邮箱验证码+输入手机')

- 我想搞出来的交互形式
    1. 批量化输入账户id
        chrome popup输入id
    2. 批量化打开页面
        注意是否会因为大量打开被反屏蔽
        这边有个问题
    3. 批量执行fake drag,页面跳转
        后续可以添加失败重试逻辑
    4. 校验结束，匹配到页面对应的关键词
        此处需要写个switch逻辑 每种case写匹配规则
    5. 写入indexDB或者写入localstorage
        chrome.localstorage
        获取用户id: document.referrer
        写入localstorage


> 参考资料:
- https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html
