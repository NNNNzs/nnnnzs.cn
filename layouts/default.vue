<template>
  <slot />
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (title) => `${title} | NNNNzs`,
  meta: [{ name: "description", content: "My amazing site." }],
});
</script>

<style>

</style>
