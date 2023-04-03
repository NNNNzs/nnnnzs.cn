<template>
  <ClientOnly>
    <div id="container" class="w-screen h-screen flex justify-center items-center">
    </div>
  </ClientOnly>
</template>
<script lang="ts" setup>
import { ElLoading, ElButton, ElMessage } from 'element-plus'
import axios from 'axios';
const loading = ref(false);
useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/css/element-plus.css"
    }
  ],
  script: [
    { src: 'http://res.wx.qq.com/open/js/jweixin-1.6.0.js' }
  ]
});

const router = useRouter()

</script>