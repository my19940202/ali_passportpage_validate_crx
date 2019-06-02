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
