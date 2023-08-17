/** 前端分页 */
const usePage = <T = any>(list: Ref<T[]>, queryParams: QueryCondition) => {
  const total = ref()
  const records = ref<T[]>()
  watchEffect(
    () => {
      total.value = list.value.length
      const start = queryParams.pageSize * (queryParams.pageNum - 1)
      const end = start + queryParams.pageSize
      records.value = list.value.slice(start, end)
    },
    { flush: "post" }
  )
  return toRefs(reactive({ total, records }))
}

export default usePage
