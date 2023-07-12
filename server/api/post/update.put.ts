import { updateById } from '@/api/post'

export default defineEventHandler(async (event) => {
  const id = getQuery(event).id as string;
  const post: Post = await readBody(event)
  return await updateById(id, post)
})