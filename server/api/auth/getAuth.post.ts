import { baseUrl } from "@/composables/baseUrl";
import { appendResponseHeader, getRequestHeaders } from 'h3'
import dayjs from 'dayjs'

/** 
 * 获取授权 建议弃用
 * @deprecated
 */
export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event)
  const res: ResponeBody<string> = await $fetch(baseUrl + '/auth', {
    method: 'POST',
    headers: headers as Record<string, string>
  });

  setCookie(event, 'N_token', res.data, {
    path: '/',
    secure: true,
    httpOnly: true,
    sameSite: 'none',
    expires: new Date(dayjs().add(2, 'month').valueOf()),
  })

  return res

})