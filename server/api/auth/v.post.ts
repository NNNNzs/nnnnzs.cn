import { baseUrl, Host } from "@/composables/baseUrl";
import { appendResponseHeader, getRequestHeaders } from 'h3'

/** 验证是否授权 */
export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event)
  const res: ResponeBody<string> = await $fetch(baseUrl + '/auth/', {
    method: 'GET',
    headers: Object.assign({ Host }, headers) as Record<string, string>
  });

  return res

})