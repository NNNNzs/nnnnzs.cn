// import { asSitemapUrl, defineSitemapEventHandler } from '#imports';

export default defineSitemapEventHandler(async () => {

  const pages = await $fetch<{ record: Post[] }>('https://www.nnnnzs.cn/api/post/list?pageNum=1&pageSize=99999');

  return [
    // map URLS as needed
    ...pages.record.map(p => asSitemapUrl({
      loc: p.path,
      title: p.title,
      lastmod: p.updated,
      url: p.path
    }))
  ]
})
