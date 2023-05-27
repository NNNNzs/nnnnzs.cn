<template>
  <div class="w-screen h-screen flex flex-col p-4">
    <div class="asd">
      <ElMenu mode="horizontal">
        <ElMenuItem v-for="p in list" :index="p.path">
          <NuxtLink :to="p.path">
            {{ p.name }}
          </NuxtLink>
        </ElMenuItem>
      </ElMenu>
    </div>

    <div class="flex-1 overflow-hidden">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElTag, ElMenu, ElMenuItem } from 'element-plus';
const route = useRoute();

definePageMeta({
  middleware: ['auth']
});

const list = [
  { path: '/cdn', name: "刷新CDN" },
  { path: '/pic', name: "图片测试" },
  { path: '/upload', name: "上传" },
  { path: '/admin', name: "上传" },
].map(e => {
  e.path = TOOLSE_PERFIX_PAGE + e.path
  return e;
});

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