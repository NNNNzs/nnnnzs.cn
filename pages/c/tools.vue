<template>
  <div class="w-screen h-screen flex flex-col">
    <Header></Header>
    <div class="flex-1 flex flex-row p-4 overflow-hidden">
      <div class="menu">
        <ElMenu mode="vertical" :default-active="route.path">
          <NuxtLink v-for="p in list" :to="p.path">
            <ElMenuItem :index="p.path">
              {{ p.name }}
            </ElMenuItem>
          </NuxtLink>
        </ElMenu>
      </div>

      <div class="flex-1 overflow-hidden">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElMenu, ElMenuItem } from "element-plus"
const route = useRoute()

definePageMeta({
  middleware: ["auth"]
})

const list = [
  { path: "/AMap", name: "高德地图" },
  { path: "/upload", name: "上传" },
  { path: "/admin", name: "管理" },
  { path: "/online", name: "在线" },
  { path: "/log", name: "日志" },
  { path: "/three", name: "three" }
].map((e) => {
  e.path = TOOLSE_PERFIX_PAGE + e.path
  return e
})
</script>

<style lang="less">
@import url("~/assets/css/hide-fe.less");
</style>
