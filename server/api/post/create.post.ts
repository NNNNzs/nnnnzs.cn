import { createPost } from '@/api/post'

export default defineEventHandler(async (event) => {
  const post: Post = await readBody(event)
  return await createPost(post)
})