const prodBaseUrl = "http://www.nnnnzs.cn/api-remote"

/** 浏览器端使用的代理地址 */
export const clientUrl = '/api-remote'



// export const baseUrl = "https://api.nnnnzs.cn/V2"
// // export const baseUrl = "https://www.nnnnzs.cn/api-remote"
// // export const baseUrl = "/api-remote";
/**
 * 服务端运行的时候，无法走代理
 * 客户端运行的时候则可以
 * 服务端的请求的接口
 */
export const baseUrl =
  process.env.NODE_ENV !== "production"
    // ? "http://localhost:3006"
    ? "http://localhost:3002/api-remote"
    // ? "https://api.nnnnzs.cn/V2"
    : prodBaseUrl
