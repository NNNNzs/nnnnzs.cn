<template>
  <div class="w-full h-full">
    <ElTable :data="tableList" border fit height="100%">
      <ElTableColumn
        v-for="item in tableHeader"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width"
        :formatter="item.formatter || undefined"
      >
      </ElTableColumn>
      <ElTableColumn prop="edit" label="操作">
        <template #default="{ row }">
          <el-button
            link
            type="primary"
            size="small"
            @click="handleDelete(row)"
            >下线</el-button
          >
        </template>
      </ElTableColumn>
    </ElTable>
  </div>
</template>

<script setup lang="ts">
import {
  ElTable,
  ElTableColumn,
  ElButton,
  dayjs,
  ElMessage
} from "element-plus"
interface Row {
  token: string
  ua: string
  up: string
  date: string
}
const tableList = ref<Row[]>([])
const tableHeader = ref([
  { prop: "ua", label: "ua", width: 600 },
  { prop: "ip", label: "ip" },
  { prop: "token", label: "token" },
  { prop: "lastUsed", label: "lastUsed" },
  {
    prop: "date",
    label: "授权时间",
    formatter(row: Row) {
      return dayjs(row.date).format("YYYY-MM-DD HH:MM:ss")
    }
  }
])
const getList = () => {
  $fetch(clientUrl + "/auth/all", { method: "post" }).then((res) => {
    tableList.value = res as Row[]
  })
}
onMounted(() => {
  getList()
})

const handleDelete = ({ token }: Row) => {
  $fetch(clientUrl + "/auth/del", {
    method: "post",
    body: { token: token }
  }).then((res) => {
    ElMessage.success("删除成功")
    const r = res as ResponeBody
    if (r.status) {
      getList()
    }
  })
}
</script>

<style scoped></style>
