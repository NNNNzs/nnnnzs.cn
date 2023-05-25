import { getListByTag } from '~~/api/post'

export default defineEventHandler(async (event) => {
  const query = getRouterParam(event, 'tag');
  return await getListByTag(query);
})