##

空格转换成连字符

在线解析

简介实现原理: 转换成 Html，去掉标签提取文字

## 命令

### build

The build command creates a .output directory with all your application, server and dependencies ready for production.

### generate

The generate command pre-renders every route of your application and stores the result in plain HTML files that you can deploy on any static hosting services. The command triggers the nuxi build command with the prerender argument set to true

### preview

The preview command starts a server to preview your Nuxt application after running the build command.

### todo

- [ ] 解决搜索无法展现的问题 优先级 3
- [x] 新增创建文章的功能 优先级 1
- [ ] 解决文章链接同步的问题 优先级 2
- [ ] tags页面 archives 页面 优先级 1

# 这一次终于真的要写博客了

> 当你有想要实现想法的时候，最好的时间点就是现在 --NNNNzs

# 规划层面

## 首页

还是以博客文章为主,兼容 hexo 格式的 md 文件，目前解析器已搞定，后面还要整理文字的各种格式，最好能 validate
数据库方案还是文件方案还没想好，也可以存文件放到 cos 里面

## 分类页

搞几个花里胡哨的列表页，一定要有时间轴功能

## 旅游页

想的是高德地图上面标点，参照魅族手机的地图，那可真是太 🐂🍺 了
主要是手机照片备份的拿过来
参照 QQ 空间旅游相册 大学时光不该荒唐
读取照片的 EXIF 的，GPS 这些信息

## 动态页

收藏一点自己看的书点的赞之类的

## 关于

做个简历，作品展示？但是好像和右边浮动的模块重复了，暂时还没想好

## 静态资源

cdn => cos
cdn 的缓存机制，可以在 oss 里面做图片压缩 目前都有资源包，后续需要关注

## 登录页

OAuth 先把 github 的走通了

## 数据库

一些用户信息还是要存库的，少不了

# 技术层面

## 前端

vite vue3.0 全家桶 ant-design-vue tailwind
后续肯定要转 ts 的 再说吧

## 后端

express + serveless + jwt
目前没啥好的后端框架选型，express 一把梭的 restful 了

## 运维

自动部署肯定要有，serveless 看看能不能 工作流搞起来

## git

github pre-lint-hook
