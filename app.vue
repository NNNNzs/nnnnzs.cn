<template>
  <div class="bg-[#efefef] dark:bg-slate-900">
    <!-- <NuxtWelcome /> -->
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
const userInfo = useUserInfoStore()
userInfo.getInfo()

onMounted(() => {
  if (
    window.location.host === "nnnnzs.cn" &&
    window.location.protocol !== "https://"
  ) {
    window.location.href =
      "https://www.nnnnzs.cn" + window.location.pathname
  }
})
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
