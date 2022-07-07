<template>
  <a-result
    status="404"
    title="404"
    :sub-title="`当前页面不存在，${logBackTime}秒后跳转回上一页`"
  >
    <template #extra>
      <a-button @click="goBack" type="primary">Back Home</a-button>
    </template>
  </a-result>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "NotFound",
  setup() {
    const router = useRouter();
    const logBackTime = ref(1);

    const timmer = setInterval(() => {
      if (logBackTime.value-- === 0) {
        clearTimeout(timmer);
        logBackTime.value = 0;
        goBack();
      }
    }, 1000);
    const goBack = () => {
      router.go(-1);
      clearTimeout(timmer);
    };

    return {
      logBackTime,
      goBack,
    };
  },
});
</script>