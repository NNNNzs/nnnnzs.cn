import { baseUrl } from "@/composables/baseUrl";
import { appendResponseHeader, getRequestHeaders } from 'h3'

export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event)
  const res: ResponeBody<string> = await $fetch(baseUrl + '/auth', {
    method: 'GET',
    headers: headers as Record<string, string>
  });

  return res

})