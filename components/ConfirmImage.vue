<template>
  <div>
    检测到剪贴板的图片外链
    <a :href="props.text" target="_blank">{{ props.text }}</a>
    是否上传？
    <img :src="props.text" :alt="props.text">
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  text: String
})
</script>

<style scoped></style>