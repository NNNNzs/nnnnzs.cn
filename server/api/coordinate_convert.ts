interface Res {
  locations: string,
  info: string,
  status: '0' | '1'
}
export default defineEventHandler(async (event) => {

  const query = getQuery(event);

  const params = {
    key: '03feeb904d9750aec612757f79f42733',
    ...query,
  }

  const res: Res = await $fetch('https://restapi.amap.com/v3/assistant/coordinate/convert', {
    query: params
  })

  return res;
})