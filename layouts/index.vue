<template>
  <Common>
    <router-view></router-view>
  </Common>
</template>

<script lang="ts">
import Common from "../components/Common.vue";

import { defineComponent } from "vue";

export default defineComponent({
  components: { Common },
});
</script>

<style>
</style>