<template>
  <slot />
</template>

<script lang="ts" setup>
useHead({
  titleTemplate: (title) => `NNNNzs - ${title}`,
  meta: [{ name: "description", content: "My amazing site." }],
});
</script>

<style>

</style>
