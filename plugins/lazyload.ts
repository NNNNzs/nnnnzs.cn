interface LayzeLoadImgElement extends HTMLImageElement {
  observer: IntersectionObserver | null
  dataset: {
    src?: string
  }
}
const default_img = 'https://static.nnnnzs.cn/upload/c794699b0dcd2d1db62b4d3b583744a9.gif';
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("lazyload", {
    created(el: LayzeLoadImgElement) {
      el.setAttribute('src', default_img)
    },
    mounted(el: LayzeLoadImgElement) {
      // 创建一个IntersectionObserver实例
      el.observer = new IntersectionObserver(
        // 回调函数
        (entries) => {
          // 遍历每个被观察元素
          for (let entry of entries) {
            // 如果元素可见
            if (entry.isIntersecting) {
              // 获取data-src属性值
              let src = (entry.target as LayzeLoadImgElement).dataset.src
              // 如果有值，则替换src属性值
              if (src) {
                entry.target.setAttribute("src", src)
                entry.target.setAttribute("dataset", "")
              }

            }
          }
        },
        // 选项对象
        {
          // 交叉比例为0.3
          threshold: 0.4
          // 延迟时间为300毫秒
          // delay: 300
        }
      )
      // 开始观察目标元素
      el.observer.observe(el)
    },
    // 指令卸载时
    unmounted(el: LayzeLoadImgElement) {
      // 停止观察目标元素并销毁实例
      el.observer?.disconnect()
      el.observer = null
    }
  })
})
