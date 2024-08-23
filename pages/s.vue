<template>
  <div>

  </div>
</template>

<script setup lang="ts">

defineOptions({
  name: "Search",
});

const route = useRoute();
const keyword = route.query.keyword as string


</script>

<style scoped></style>