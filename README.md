##

## 旅游页

高德地图上面标点，参照魅族手机的地图
主要是手机照片备份的拿过来
参照 QQ 空间旅游相册 大学时光不该荒唐
读取照片的 EXIF 的，GPS 这些信息

## 动态页

收藏一点自己看的书点的赞之类的,社交动态爬虫

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
nuxt3  tailwind  ts 

## 后端
nestjs + mysql 

## 运维

github action 自动部署


# QA
1. server/api里面使用$fetch 是不是不走nuxt.config.ts nitro.devProxy这个代理