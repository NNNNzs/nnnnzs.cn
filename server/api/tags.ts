import { getTags } from '~~/api/post';

export default defineEventHandler(async (event) => {
  return await getTags();
})