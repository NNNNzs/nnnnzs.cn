<template>
  <ClientOnly>
    <div id="container" class="w-screen h-screen flex justify-center items-center">
      <el-button @click="perminss">授权</el-button>
    </div>
  </ClientOnly>
</template>
<script lang="ts" setup>
import { ElLoading } from 'element-plus'
const loading = ref(false);
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/css/element-plus.css"
    }
  ]
});

const perminss = () => {
  if (loading.value) return false
  let times = 0;
  setInterval(() => {
    if (times++ >= 100) {
      loading.value = false
      loadingInstance.close()
    }
  }, 1000);
  
  const loadingInstance = ElLoading.service({ target: 'container', fullscreen: true, text: '授权中' });
  loading.value = true;
  $fetch('/api/getAuth').then(res => {
    loading.value = false
    loadingInstance.close()
  })
}
</script>