<template>
  <div class="w-screen h-screen">
    <!-- <div>tools</div> -->
    <div class="w-full h-full">
      <NuxtPage />
    </div>
  </div>
</template>

<script setup lang="ts">
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