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

type PostRes = AxiosResponse<ResponeBody<QueryRes<Post>>>;

export const getPostList = async (params: QueryCondition) => {
  const res: PostRes = await axios({
    url: "https://api.nnnnzs.cn/V2/post/findNews",
    method: "get",
    params,
  });
  if (res.data.status) {
    return res.data.data;
  }
};

