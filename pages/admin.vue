<template>
  <ClientOnly>
    <div class="full">
      <div v-if="validatePass">
        <ElTable :data="tableList">
          <ElTableColumn v-for="item in tableHeader" :key="item.prop" :label="item.prop" :prop="item.prop"
            :formatter="item.formatter || undefined">
          </ElTableColumn>
          <ElTableColumn prop="edit" label="操作">
            <template #default="{ row }">
              <el-button link type="primary" size="small" @click="show(row)">查看</el-button>
              <el-button link type="primary" size="small" @click="edit(row)">编辑</el-button>
              <el-button link type="primary" size="small" @click="handleDelete(row)">删除</el-button>
            </template>
          </ElTableColumn>
        </ElTable>
      </div>
      <div>
        <ElPagination v-model:current-page="query.pageNum" v-model:page-size="query.pageSize" :total="query.total">
        </ElPagination>
      </div>
    </div>
  </ClientOnly>

</template>

<script setup lang="ts">
import { ElTable, ElTableColumn, ElButton, ElPagination } from 'element-plus'
import { getPostList, deletePost } from '@/api/post';
import dayjs from 'dayjs'
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "//cdn.jsdelivr.net/npm/element-plus/dist/index.css"
    }
  ]
})
interface Query extends QueryCondition {
  hide: string,
  total: number
}
const query = reactive<Query>({
  pageSize: 10,
  pageNum: 1,
  hide: 'all',
  total: 0
});
const tableList = ref<Post[]>([])

const tableHeader = ref([
  { prop: 'id', label: "id" },
  { prop: 'title', label: "标题" },
  {
    prop: 'date', label: "date", formatter(row: Post) {
      return dayjs(row.date).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  { prop: 'tags', label: "tags" },
  {
    prop: 'hide', label: "隐藏", formatter(row: Post) {
      if (row.hide === '1') {
        return '隐藏'
      }
      return '显示'
    }
  },
  { prop: 'path', label: "路径" },
  { prop: 'description', label: "描述" },
])

const validatePass = ref(true);
const show = (row: Post) => {
  window.open(row.path)
}
const edit = (row: Post) => {
  window.open('/edit/' + row.id)

}
const handleDelete = (row: Post) => {
  deletePost(row.id).then(res => {
    if (res.data.status) {
      getList()
    }
  })
}

const getList = () => {
  getPostList(query).then(res => {
    if (res) {
      const { record, total } = res;
      query.total = total
      if (record) {
        tableList.value = record;
      }
    }
  })
}
watchEffect(getList)
onMounted(() => {
  getList()

})

</script>

<style scoped>

</style>