<template>
  <div>
    <ElResult
      icon="error"
      title="Error Tip"
      :sub-title="`你没有权限，即将跳转首页 ${3 - counter}`"
    >
    </ElResult>
  </div>
</template>

<script setup lang="ts">
import { ElResult } from "element-plus"
import { useInterval } from "@vueuse/core"

const counter = useInterval(1000, {
  callback: () => {
    if (counter.value === 3) {
      navigateTo({ path: "/" })
    }
  }
})
</script>

<style scoped></style>
