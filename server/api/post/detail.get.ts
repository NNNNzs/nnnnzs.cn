import { getPostById } from '@/api/post'

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  return await getPostById(query.title as string);
})