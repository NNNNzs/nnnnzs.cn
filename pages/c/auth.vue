<template>
  <ClientOnly>
    <div id="container" class="w-screen h-screen flex justify-center items-center">
      <el-button @click="perminss">授权</el-button>
    </div>
  </ClientOnly>
</template>
<script lang="ts" setup>
import { ElLoading, ElButton, ElMessage } from 'element-plus'

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/css/element-plus.css"
    }
  ]
});

const router = useRouter();
const route = useRoute()
const redi = route.query.redi as string;
const perminss = async () => {
  const loadingInstance = ElLoading.service({ target: 'container', fullscreen: true, text: '授权中' });

  const { stop, start } = useTimeoutFn(() => {
    loadingInstance.close()
  }, 5000)

  start();

  await $fetch('/api/auth/getAuth', { method: 'POST', credentials: 'include', });

  stop();
  loadingInstance.close()
  navigateTo({
    path: redi
  })



}
</script>