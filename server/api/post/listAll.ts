import { baseUrl } from '@/composables/baseUrl';
import { getPostList } from '@/api/post'

export default defineEventHandler(async (event) => {

  const res: ResponeBody<Post[]> = await $fetch(`${baseUrl}/post/listAll`, {
    method: "get",
  })

  return res.data;
})