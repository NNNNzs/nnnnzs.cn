<template>
  <div>发布于 2021-06-17 更新于 2021-07-06 技术 serveless 图片上传 热度 28 喜欢 0</div>
</template>

<script lang="ts" setup>
import { defineComponent, PropType } from "vue";
import { Post, PostMeta } from "@/types";
const props = defineProps({
  meta: {
    type: Object as PropType<PostMeta>,
    required: true,
  },
});
</script>

<style scoped></style>
