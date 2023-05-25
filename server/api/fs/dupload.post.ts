import { getLikeAndFav, type FavType } from '@/api/post'
import { baseUrl } from "@/composables/baseUrl"
import axios from 'axios';

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const res = await axios({
    url: baseUrl + "/dupload",
    method: "post",
    data: { url: query.url },
  });
  if (res.data.url) {
    return res.data.url as string
  }
})