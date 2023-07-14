<template>
  <ClientOnly>
    <div class="w-screen h-screen flex flex-col p-4">
      <div class="menu">
        <ElMenu mode="horizontal" :default-active="route.path">
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
  </ClientOnly>
</template>

<script setup lang="ts">
import { ElMenu, ElMenuItem } from 'element-plus';
const route = useRoute();

definePageMeta({
  middleware: ['auth']
});

const list = [
  { path: '/cdn', name: "刷新CDN" },
  { path: '/pic', name: "图片测试" },
  { path: '/upload', name: "上传" },
  { path: '/admin', name: "管理" },
  { path: '/log', name: "日志" },
].map(e => {
  e.path = TOOLSE_PERFIX_PAGE + e.path
  return e;
})

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/css/element-plus.css"
    }
  ]
});

</script>

<style scoped></style>