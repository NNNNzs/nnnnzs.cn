<template>
  <ClientOnly>
    <div></div>
  </ClientOnly>
</template>

<script setup lang="ts">

const { data } = await useFetch('/api/auth/v', {
  method: 'POST',
  credentials: 'include'
})

const loginMenu = [
  { name: "新增", path: EDIT_PAGE + "edit", target: "_blank" },
  { name: "管理", path: TOOLSE_PERFIX_PAGE + "/admin", target: "_blank" },
  { name: "日志", path: TOOLSE_PERFIX_PAGE + "/log" }
];

</script>

<style scoped></style>