<template>
  <div ref="bgRef" class="login-bg">
    <div class="items-center h-full bg-white w-[500px]">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import dayjs from "dayjs"
const bgRef = ref<HTMLElement>()
// useCssVar("--bg-url", bgRef)
</script>

<style scoped>
.login-bg {
  --bg-url: url("https://static.nnnnzs.cn/bing/20240704.png");
  background-image: var(--bg-url);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transition: background-image 1s ease-in-out;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: row-reverse;
}
</style>
