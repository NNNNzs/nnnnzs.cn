import axios from "axios"
import { baseUrl } from "@/utils/const"
export default defineEventHandler(async (evt) => {
  const res = await axios.post(baseUrl + "/getAuth")
  return res.data
})
