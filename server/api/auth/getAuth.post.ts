import { baseUrl } from "@/composables/baseUrl";
import { appendResponseHeader, getRequestHeaders } from 'h3'
import dayjs from 'dayjs'

export default defineEventHandler(async (event) => {
  const headers = getRequestHeaders(event)
  const res: ResponeBody<string> = await $fetch(baseUrl + '/getAuth', {
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