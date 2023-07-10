const prodBaseUrl = "https://www.nnnnzs.cn/api-remote"


/**
 * 服务端运行的时候，无法走代理
 * 客户端运行的时候则可以
 */
// export const baseUrl = "https://api.nnnnzs.cn/V2"
// // export const baseUrl = "https://www.nnnnzs.cn/api-remote"
// // export const baseUrl = "/api-remote";

export const baseUrl =
  process.env.NODE_ENV !== "production"
    // ? "http://localhost:3006"
    ? "http://localhost:3002/api-remote"
    // ? "https://api.nnnnzs.cn/V2"
    : prodBaseUrl
