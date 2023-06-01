import { baseUrl } from '@/composables/baseUrl';
import { getPostList } from '@/api/post'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  const res: ResponeBody<PageQueryRes<Post>> = await $fetch(`${baseUrl}/post/list`, {
    method: "get",
    query
  });
  
  return res.data;

})