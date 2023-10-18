<template>
  <div class="post-tags hidden md:block text-gray text-slate-700 dark:text-slate-400">
    <span class="mr-2" v-for=" tag in post.tags.split(',') " :key="tag">
      <a :href="`${TAG_PREFIX_PAGE}/${tag}/`" :target="A_TAGET">
        {{ tag }}
      </a>
    </span>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { TAG_PREFIX_PAGE, A_TAGET } from '~~/composables/routes'

defineProps({
  post: {
    type: Object as PropType<Post>,
    default: () => ({}),
  },
  preview: {
    type: Boolean,
    default: false
  }
});
</script>

<style scoped></style>