import axios, { AxiosResponse } from "axios"

export default defineEventHandler(async (evt) => {
  const id = evt.context.params.id
  const t = encodeURIComponent(id)
  const res: PostRes = await axios({
    url: `${baseUrl}/post/${t}`,
    method: "get"
  })
  if (res.data.status) {
    return res.data.data
  }
})
