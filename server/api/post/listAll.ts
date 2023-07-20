import { baseUrl } from '@/composables/baseUrl';
import { getRequestHeaders } from 'h3'

export default defineEventHandler(async (event) => {

  const headers = getRequestHeaders(event)
  const res: ResponeBody<Post[]> = await $fetch(`${baseUrl}/post/listAll`, {
    method: "get",
    headers: Object.assign({ Host }, headers) as Record<string, string>
  })

  return res.data;
})