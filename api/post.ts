import axios, { AxiosResponse } from "axios"

interface QueryCondition {
  pageSize: number
  pageNum: number
}
interface QueryRes<T> extends QueryCondition {
  record: T[] | null
  total: number
}
export interface ResponeBody<T = any | null> {
  status: boolean
  msg: string
  data: T
}
const prodBaseUrl = "https://api.nnnnzs.cn/V2"
const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3006"
    : prodBaseUrl

type PostList = AxiosResponse<ResponeBody<QueryRes<Post>>>
type PostRes = AxiosResponse<ResponeBody<Post>>
export const getPostList = async (params: QueryCondition) => {
  const res: PostList = await axios({
    url: `${baseUrl}/post/list`,
    method: "get",
    params
  })
  if (res.data.status) {
    return res.data.data
  }
}

/** 根据id或者标题，获取 */
export const getPostById = async (id: number | string) => {
  const t = encodeURIComponent(id)
  const res: PostRes = await axios({
    url: `${baseUrl}/post/${t}`,
    method: "get"
  })
  if (res.data.status) {
    return res.data.data
  }
}

export const updateById = async (id: string, data: Post) => {
  if (id === "edit") {
    const res: PostRes = await axios({
      url: `${baseUrl}/post/${id}`,
      method: "put",
      data
    })
    return res
  } else {
    const res: PostRes = await axios({
      url: `${baseUrl}/post/${id}`,
      method: "put",
      data
    })
    return res
  }
}

/** 从leancloud 提取喜欢*/
export const getLikeAndFav = () => {}

/** 从leancloud 提取 */
