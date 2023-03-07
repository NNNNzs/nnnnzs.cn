// export const baseUrl = "/api-remote"
// const prodBaseUrl = "https://api.nnnnzs.cn/V2"
const prodBaseUrl = "/api-remote"

export const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3006"
    : prodBaseUrl
