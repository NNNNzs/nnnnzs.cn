<template>
  <div>
    <!-- <NuxtWelcome /> -->
    <NuxtPage />
  </div>
</template>
<script setup lang="ts">
import { init } from "leancloud-storage";
const {
  Leancloud_appId = "",
  Leancloud_appKey = "",
  Leancloud_serverURL = "",
} = useRuntimeConfig().public;
let hasInit = false;
if (!hasInit) {
  init({
    appId: Leancloud_appId as string,
    appKey: Leancloud_appKey as string,
    serverURL: Leancloud_serverURL as string,
  });
  hasInit = true;
}


</script>