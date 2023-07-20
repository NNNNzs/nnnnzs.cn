
/** 服务端使用的代理地址 */
const prodBaseUrl = "https://api.nnnnzs.cn/V2"

/** 浏览器端使用的代理地址 */
export const clientUrl = '/api-remote'

/**
 * 服务端运行的时候，无法走代理
 * 客户端运行的时候则可以
 * 服务端的请求的接口
 */
export const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3002/api-remote"
    // ? "https://api.nnnnzs.cn/V2"
    : prodBaseUrl


export const Host = process.env.NODE_ENV !== "production" ? 'localhost' : 'api.nnnnzs.cn'
