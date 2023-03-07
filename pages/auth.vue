<template>
  <ClientOnly>
    <div id="container" class="w-screen h-screen flex justify-center items-center">
      <el-button @click="perminss">授权</el-button>
    </div>
  </ClientOnly>
</template>
<script lang="ts" setup>
import { ElLoading, ElButton, ElMessage } from 'element-plus'
const loading = ref(false);
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/css/element-plus.css"
    }
  ]
});

const router = useRouter()
const perminss = async () => {

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
  const url = baseUrl + '/getAuth'
  $fetch(url, { method: 'post' }).then((res: any) => {
    loading.value = false
    loadingInstance.close()
    const token = useCookie('N_token');
    console.log(token);
    token.value = res.data as string

    ElMessage.success('授权成功即将跳转');
    setTimeout(() => {
      router.go(-1)
    }, 3000);
  })
}
</script>