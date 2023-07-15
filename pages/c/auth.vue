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
const nextPath = route.query.nextPath as string;

onMounted(() => {
  $fetch('/api/auth/v', { method: 'POST', credentials: 'include', }).then(res => {
    if (res.status) {
      router.push({
        path: nextPath
      })
    }
  })
})

const perminss = async () => {
  const loadingInstance = ElLoading.service({ target: 'container', fullscreen: true, text: '授权中' });

  const { stop, start } = useTimeoutFn(() => {
    loadingInstance.close()
  }, 5 * 1000 * 60)

  start();




  await $fetch(clientUrl + '/auth/get', { method: 'POST', credentials: 'include', });

  stop();
  loadingInstance.close();

  router.push({
    path: nextPath
  })

}
</script>