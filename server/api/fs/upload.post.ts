import { baseUrl } from "@/composables/baseUrl"
import axios from 'axios';
// import formidable from 'formidable'
export default defineEventHandler(async (event) => {

  const formData = await readMultipartFormData(event);
  console.log('instanceof ', formData instanceof FormData);
  console.log('formData ', formData);

  const res = await axios({
    url: baseUrl + "/upload",
    method: "post",
    data: formData
  });

  // if (res.data.url) {
  //   return res.data.url as string
  // }
})