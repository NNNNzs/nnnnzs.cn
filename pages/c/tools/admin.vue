<template>
  <ClientOnly>
    <div class="w-full h-full flex flex-col p-4 bg-blue-50">
      <div class="h-8 flex flex-row justify-between mb-4">
        <div>
          <el-button type="primary" @click="addPost">新增</el-button>
          <el-button type="primary" @click="getList">刷新</el-button>
        </div>
        <div class="w-50">
          <el-input v-model.lazy="query.query"></el-input>
        </div>
      </div>
      <div class="flex-1 overflow-hidden">
        <ElTable :data="tableList" border height="100%">
          <ElTableColumn
            v-for="item in tableHeader"
            :key="item.prop"
            :label="item.prop"
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
                @click="show(row)"
                >查看</el-button
              >
              <el-button
                link
                type="primary"
                size="small"
                @click="edit(row)"
                >编辑</el-button
              >
              <el-button
                link
                type="primary"
                size="small"
                @click="handleDelete(row)"
                >删除</el-button
              >
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
      <div class="h-8 flex justify-end">
        <ElPagination
          v-model:current-page="query.pageNum"
          v-model:page-size="query.pageSize"
          :total="pageTotal"
        />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import {
  ElTable,
  ElTableColumn,
  ElButton,
  ElPagination,
  ElInput
} from "element-plus"
import dayjs from "dayjs"

definePageMeta({
  middleware: ["auth-admin"]
})
interface Query extends QueryCondition {
  hide: string
  query: string
}

const query = reactive<Query>({
  pageSize: 10,
  pageNum: 1,
  hide: "all",
  query: ""
})

const pageTotal = ref(0)
const tableList = ref<Post[]>([])

const tableHeader = ref([
  { prop: "id", label: "id", width: 50 },
  { prop: "title", label: "标题" },
  {
    prop: "date",
    label: "发布时间",
    formatter(row: Post) {
      return dayjs(row.date).format("YYYY-MM-DD HH:mm:ss")
    }
  },
  {
    prop: "updated",
    label: "更新时间",
    formatter(row: Post) {
      return dayjs(row.updated).format("YYYY-MM-DD HH:mm:ss")
    }
  },
  { prop: "tags", label: "tags" },
  {
    prop: "hide",
    label: "隐藏",
    width: 60,
    formatter(row: Post) {
      if (row.hide === "1") {
        return "隐藏"
      }
      return "显示"
    }
  },
  { prop: "path", label: "路径" },
  { prop: "description", label: "描述" }
])

const show = (row: Post) => {
  window.open(row.path)
}
const edit = (row: Post) => {
  window.open(EDIT_PAGE + row.id)
}

const addPost = () => {
  window.open(EDIT_PAGE + "edit")
}

const handleDelete = (row: Post) => {
  if (row.id) {
    $fetch(clientUrl + `/post/${row.id}`, {
      method: "DELETE",
      query: { id: row.id }
    }).then((r) => {
      const res = r as ResponeBody
      if (res.status) {
        getList()
      }
    })
  }
}

const getList = async () => {
  const res = await $fetch("/api/post/list", { query })
  pageTotal.value = res.total
  tableList.value = res.record
}

watchEffect(() => {
  getList()
})
</script>

<style scoped></style>
