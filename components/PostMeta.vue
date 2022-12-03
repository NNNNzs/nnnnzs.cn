<template>
  <div>
    <template v-if="meta.updated">
      <span>更新于 {{ meta.updated }}</span>
    </template>
    <template v-else> 发布于 {{ meta.date }} </template>
    <span v-for="tag in meta.tags" :key="tag">{{ tag }}</span> 热度 28 喜欢 0
  </div>
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

<style scoped>

</style>
