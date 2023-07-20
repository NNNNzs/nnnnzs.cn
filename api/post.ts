import axios, { AxiosResponse } from "axios"
import { baseUrl } from "@/composables/baseUrl"
declare type AxiosRes<T> = AxiosResponse<ResponeBody<T>>
declare type PostList = AxiosRes<PageQueryRes<Post>>
declare type PostRes = AxiosRes<Post>

/** 分页获取列表 */
export const getPostList = async (params: QueryCondition) => {
  const res: PostList = await axios({
    url: `${baseUrl}/post/list`,
    method: "get",
    params
  })
  return res.data;
}

/** 根据id或者标题，获取 */
export const getPostById = async (id: number | string) => {
  const t = encodeURIComponent(id)
  const res: PostRes = await axios({
    url: `${baseUrl}/post/${t}`,
    method: "get"
  })
  return res.data.data as Post
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
  const res = await axios({
    url: `${baseUrl}/post/updateLike`,
    method: "get",
    params: { id, type }
  })
  if (res.data.status) {
    return res.data.data
  }
}
export const getTags = async () => {
  const res = await axios({
    url: `${baseUrl}/post/tags`,
    method: "get"
  })
  if (res.data.status) {
    return res.data.data as [string, number][]
  }
}

export const getListByTag = async (tag: string) => {
  const res = await axios({
    url: `${baseUrl}/post/tags/${tag}`,
    method: "get"
  });
  if (res.data.status) {
    return res.data.data as Post[]
  }
}
