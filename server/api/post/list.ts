import { baseUrl } from '@/composables/baseUrl';
import { getPostList } from '@/api/post'

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as unknown as QueryCondition

  const res: ResponeBody<PageQueryRes<Post>> = await getPostList(query)

  return res.data;
})