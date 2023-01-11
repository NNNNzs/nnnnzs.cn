import axios, { AxiosResponse } from "axios"

const prodBaseUrl = "https://api.nnnnzs.cn/V2"

const baseUrl =
  process.env.NODE_ENV !== "production"
    ? "http://localhost:3006"
    : prodBaseUrl

type AxiosRes<T> = AxiosResponse<ResponeBody<T>>
type PostList = AxiosRes<QueryRes<Post>>
type PostRes = AxiosRes<Post>

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

export const updateById = async (id: string, data: PostEdit) => {
  const res: PostRes = await axios({
    url: `${baseUrl}/post/${id}`,
    method: "put",
    data
  })
  return res
}

export const createPost = async (data: PostEdit) => {
  const res: PostRes = await axios({
    url: `${baseUrl}/post/`,
    method: "post",
    data
  })
  return res
}

/** 删除文章 */
export const deletePost = async (id: string | number) => {
  const res: PostRes = await axios({
    url: `${baseUrl}/post/${id}`,
    method: "delete"
  })
  return res
}

export enum FavType {
  likes = "likes",
  visitors = "visitors"
}

/** 添加访客或者喜欢*/
export const getLikeAndFav = async (
  id: number | string,
  type: FavType = FavType.visitors
) => {
  return await axios({
    url: `${baseUrl}/post/updateLike`,
    method: "get",
    params: { id, type }
  })
}
export const getTags = async () => {
  return await axios({
    url: `${baseUrl}/post/tags`,
    method: "get"
  })
}

export const getListByTag = async (tag: string) => {
  return (await axios({
    url: `${baseUrl}/post/tags/${tag}`,
    method: "get"
  })) as AxiosRes<Post[]>
}
