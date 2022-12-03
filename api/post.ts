import axios, { AxiosResponse } from "axios";
import { Post } from "../types/index";

interface QueryCondition {
  pageSize: number;
  pageNum: number;
}
interface QueryRes<T> extends QueryCondition {
  record: T[];
  total: number;
}
export interface ResponeBody<T = any> {
  status: boolean;
  msg: string;
  data: T;
}

type PostList = AxiosResponse<ResponeBody<QueryRes<Post>>>;
type PostRes = AxiosResponse<ResponeBody<Post>>;
export const getPostList = async (params: QueryCondition) => {
  const res: PostList = await axios({
    url: "https://api.nnnnzs.cn/V2/post/list",
    method: "get",
    params,
  });
  if (res.data.status) {
    return res.data.data;
  }
};

export const getPostById = async (id: number | string) => {
  const t = encodeURIComponent(id)
  const res: PostRes = await axios({
    url: `https://api.nnnnzs.cn/V2/post/${t}`,
    method: "get",
  });
  console.log("getPostById", res.data);
  if (res.data.status) {
    return res.data.data;
  }
};
