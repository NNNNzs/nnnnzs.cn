<template>
  <slot />
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    useHead({
      titleTemplate: (title) => `NNNNzs - ${title}`,
      viewport: "width=device-width, initial-scale=1, maximum-scale=1",
      charset: "utf-8",
      meta: [{ name: "description", content: "My amazing site." }],
    });
  },
});
</script>

<style></style>
