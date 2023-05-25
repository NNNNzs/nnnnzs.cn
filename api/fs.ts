import axios, { AxiosResponse } from "axios"
import { baseUrl } from "@/composables/baseUrl"
const uploadUrl = baseUrl + "/upload"

export const upload = (blob: Blob) => {
  const formData = new FormData()
  formData.append("inputFile", blob)
  return new Promise<string>((resolve, reject) => {
    axios({
      url: uploadUrl,
      method: "post",
      data: formData
    })
      .then((res: AxiosResponse<ResponeBody<string>>) => {
        const { status, data, msg } = res.data
        if (status) {
          resolve(data)
        } else {
          reject(res)
        }
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const downloadFile = () => { }
export const previewFile = () => { }
