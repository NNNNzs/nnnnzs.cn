const prodBaseUrl = "https://api.nnnnzs.cn/V2"

export const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3006"
    : prodBaseUrl
