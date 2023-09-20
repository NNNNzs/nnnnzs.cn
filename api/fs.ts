import axios, { AxiosResponse } from "axios"
import { clientUrl } from "@/composables/baseUrl"
import { ref, reactive } from 'vue';

export const upload = (blob: Blob) => {

  const success = ref(false);
  const error = ref('');
  const process = ref(0);
  const response = ref('')

  const formData = new FormData()
  formData.append("inputFile", blob)
  axios({
    url: clientUrl + "/fs/upload",
    method: "post",
    data: formData,
    onUploadProgress(e) {
      process.value = Number((Number(e.progress) * 100).toFixed(2))
    },
  })
    .then((res: AxiosResponse<ResponeBody<string>>) => {
      const { status, data, message } = res.data
      if (status) {
        success.value = true;
        response.value = data
      } else {
        error.value = message
      }
    })
    .catch((err) => {

    })

  return toRefs({ success, error, process, response })

}

export const downloadFile = () => { }
export const previewFile = () => { }
