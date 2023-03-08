<template>
  <div class="w-screen h-screen flex justify-center items-center">
    <div class="w-2/4">
      <ElInput type="textarea" v-model="url" :autosize="{ minRows: 5 }"></ElInput>
      <ElButton class="mt-4" @click="reflashCDN">提交</ElButton>
      <ElButton class="mt-4" @click="getList">刷新</ElButton>
      <ElTableV2 :data="tableList" :columns="columns" :height="200" :width="800">
      </ElTableV2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElInput, ElButton, ElTableV2 } from 'element-plus';
import type { Column } from 'element-plus';
import axios from 'axios';
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/css/element-plus.css"
    }
  ]
});
const tableList = ref<any[]>([]);
const columns: Column[] = [
  { title: 'CreateTime', dataKey: 'CreateTime', width: 100 },
  { title: 'Status', dataKey: 'Status', width: 100 },
  { title: 'Url', dataKey: 'Url', width: 500 },
  { title: 'FlushType', dataKey: 'FlushType', width: 100 },
  { title: 'Status', dataKey: 'Status', width: 100 },
]
const url = ref('')
const reflashCDN = () => {
  axios({
    url: baseUrl + '/common/purgeUrlsCache',
    method: 'post',
    data: url.value.split('\n')
  })
  console.log(url.value.split('\n'));

}
const getList = () => {
  axios({
    url: baseUrl + '/common/',
  }).then(res => {
    if (res.data.status) {
      tableList.value = res.data.data.list;
    }
  })
}
</script>


<style scoped></style>