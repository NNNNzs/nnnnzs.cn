<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <div class="w-2/4">
      <ElInput type="textarea" v-model="url" :autosize="{ minRows: 5 }"></ElInput>
      <ElButton class="mt-4" @click="reflashCDN">提交</ElButton>
      <ElButton class="mt-4" @click="getList">刷新</ElButton>
    </div>
    <div class="w-full flex-1 overflow-hidden">
      <ElTable :data="tableList" fit height="100%" border>
        <ElTableColumn v-for="col in columns" :label="col.title" :prop="col.prop"></ElTableColumn>
      </ElTable>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElInput, ElButton, ElTable, ElTableColumn, ElMessage } from 'element-plus';
import type { Column } from 'element-plus';
import axios from 'axios';
import { reflashCDNRemote } from '@/composables/cdn';


const tableList = ref<any[]>([]);
const columns: Column[] = [
  { title: 'CreateTime', prop: 'CreateTime', width: 100 },
  { title: 'Status', prop: 'Status', width: 100 },
  { title: 'Url', prop: 'Url', width: 500 },
  { title: 'FlushType', prop: 'FlushType', width: 100 },
  { title: 'Status', prop: 'Status', width: 100 },
]
const url = ref('')
const reflashCDN = () => {
  reflashCDNRemote(url.value.split('\n'))
    .then(res => {
      getList()
    })

}

const getList = () => {
  axios({
    url: clientUrl + '/common/purgeTasks',
  }).then(res => {
    if (res.data.status) {
      tableList.value = res.data.data.list;
    }
  })
}
onMounted(() => {
  getList()
});

</script>


<style scoped></style>