import { getLikeAndFav, type FavType } from '@/api/post'

export default defineEventHandler(async (event) => {
  const query = getQuery(event) as { id: string, type: FavType }
  const res = await getLikeAndFav(query.id, query.type);
  console.log(res)
  return res;
})