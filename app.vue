<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import AV from 'leancloud-storage/core'

const {
  Leancloud_appId = "",
  Leancloud_appKey = "",
  Leancloud_serverURL = "",
} = useRuntimeConfig().public;
let hasInit = false;
if (!hasInit) {
  AV.init({
    appId: Leancloud_appId as string,
    appKey: Leancloud_appKey as string,
    serverURL: Leancloud_serverURL as string,
  });
  hasInit = true;
}


</script>