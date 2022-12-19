<template>
  <slot />
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (title) => `${title} | NNNNzs`,
  meta: [
    { name: "author", content: "NNNNzs" }
  ],
});
</script>

<style>

</style>
