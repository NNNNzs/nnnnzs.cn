<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">

const {
  Leancloud_appId = "",
  Leancloud_appKey = "",
  Leancloud_serverURL = "",
} = useRuntimeConfig().public;
onMounted(() => {

  let hasInit = false;
  if (!hasInit) {
    const AV = window.AV
    // AV.init({
    //   appId: Leancloud_appId as string,
    //   appKey: Leancloud_appKey as string,
    //   serverURL: Leancloud_serverURL as string,
    // });
    // hasInit = true;
  }

})


</script>