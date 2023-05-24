import { getPostList } from '@/api/post'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  return await getPostList({
    pageNum: Number(query.pageNum),
    pageSize: Number(query.pageSize),
  });
  
})