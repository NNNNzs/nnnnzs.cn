<template>
  <ClientOnly>
    <div class="h-screen flex flex-col">
      <div class="h-8 flex flex-row justify-between">
        <div>
          <el-button @click="addPost">新增</el-button>
        </div>
        <div class="w-50">
          <el-input v-model="query.query"></el-input>
        </div>
      </div>
      <div style="height:calc(100% - 4em)" v-if="validatePass">
        <ElTable :data="tableList" border height="100%">
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
      <div class="h-8">
        <ElPagination v-model:current-page="query.pageNum" v-model:page-size="query.pageSize" :total="pageTotal" />
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { ElTable, ElTableColumn, ElButton, ElPagination, ElInput } from 'element-plus'
import { getPostList, deletePost } from '@/api/post';
import dayjs from 'dayjs'
const url = baseUrl + '/auth';
const validatePass = ref(false);
const router = useRouter()
const route = useRoute()
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/css/element-plus.css"
    }
  ]
});

interface Query extends QueryCondition {
  hide: string,
  query: string
}
const query = reactive<Query>({
  pageSize: 10,
  pageNum: 1,
  hide: 'all',
  query: '',
});
const pageTotal = ref(0)
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

const show = (row: Post) => {
  window.open(row.path)
}
const edit = (row: Post) => {
  window.open('/edit/' + row.id)
}

const addPost = () => {
  window.open('/edit/edit')
}
const handleDelete = (row: Post) => {
  if (row.id) {
    deletePost(row.id).then(res => {
      if (res.data.status) {
        getList()
      }
    })
  }
}

const getList = () => {
  getPostList(query).then(res => {
    if (res) {
      const { record, total } = res;
      pageTotal.value = total
      if (record) {
        tableList.value = record;
      }
    }
  })
}
onMounted(async () => {
  const res: { status: boolean } = await $fetch(url)
  validatePass.value = res.status;
  if (!validatePass.value) {
    const cfm = window.confirm('您没有权限，是否跳转登录');
    if (cfm) {
      router.push(`/auth?redi=${route.fullPath}`)
    } else {
      // window.close()
    }
  } else {
    // getList()
    watchEffect(getList)
  }
})

</script>

<style scoped></style>