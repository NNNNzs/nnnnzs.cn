import { deletePost } from '@/api/post'

export default defineEventHandler(async (event) => {
  const id = getQuery(event).id as string;
  return await deletePost(id)
})