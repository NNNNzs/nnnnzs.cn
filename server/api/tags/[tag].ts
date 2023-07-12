import { getListByTag } from '~~/api/post'

export default defineEventHandler(async (event) => {
  const query = getRouterParam(event, 'tag') as string;
  return await getListByTag(query);
})