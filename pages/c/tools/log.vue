<template>
  <ClientOnly>
    <div class="w-full h-full flex flex-col p-4 bg-blue-50">
      <el-form>
        <el-date-picker v-model="timeRange" type="daterange" range-separator="To" start-placeholder="Start date"
          end-placeholder="End date" size="small" value-format="YYYY-MM-DD" />
      </el-form>
      <div class="flex-1 overflow-hidden">
        <ElTable :data="tableList" border height="100%">
          <ElTableColumn v-for="item in tableHeader" :key="item.prop" :label="item.label" :prop="item.prop"
            :formatter="item.formatter || undefined">
          </ElTableColumn>
        </ElTable>
      </div>
      <div class="h-8 flex justify-end">
        <ElPagination v-model:current-page="query.pageNum" v-model:page-size="query.pageSize" :total="pageTotal" />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">


import { ElTable, ElTableColumn, ElForm, ElPagination, ElDatePicker, type DateModelType } from 'element-plus'
import dayjs from 'dayjs'

interface Query extends QueryCondition, Partial<Log> {
  startTime: string
  endTime: string
}

const query = reactive<Query>({
  pageSize: 30,
  pageNum: 1,
  startTime: dayjs().subtract(7, 'day').format('YYYY-MM-DD'),
  endTime: dayjs().add(1, 'day').format('YYYY-MM-DD')
});
const timeRange = computed({
  get() {
    return [query.startTime, query.endTime] as [DateModelType, DateModelType]
  },
  set(newVal) {
    query.startTime = newVal[0] as string
    query.endTime = dayjs(newVal[1]).add(1, 'day').format('YYYY-MM-DD') as string;
  }
})

const pageTotal = ref(0)
const tableList = ref<Partial<Log>[]>([])

const tableHeader = ref([
  { prop: 'id', label: "id" },
  { prop: 'value1', label: "value1" },
  { prop: 'value2', label: "value2" },
  { prop: 'value3', label: "value3" },
  { prop: 'value4', label: "value4" },
  {
    prop: 'time', label: "时间", formatter(row: Log) {
      return dayjs(row.time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  { prop: 'ref', label: "ref" },
])

const getList = async () => {
  const res = await $fetch(clientUrl + '/log/list', { query }) as ResponeBody<PageQueryRes<Log>>
  pageTotal.value = res.data.total;
  tableList.value = res.data.record;
}


watchEffect(() => {
  getList()
})


</script>

<style scoped></style>