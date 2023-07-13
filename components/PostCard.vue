<template>
  <ul>
    <PostCardItem v-for="(post, index) in posts " :post="post" :preview="previewId === post.id" @on-click="onPostLick">
    </PostCardItem>
  </ul>

  <div :class="{ postPreiview: !!previewId }" class="close text-white top-[-2em] fixed block invisible w-8 h-8 z-[60]"
    @click.stop="exitPreview()">
    <el-icon size="30">
      <CircleClose />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { ElIcon } from "element-plus";
import { CircleClose } from '@element-plus/icons-vue'

defineProps({
  posts: {
    type: Array as PropType<Post[]>,
    default: () => [],
  },
});

const previewId = ref<string | number>('')

// let lock = ref(false);
onMounted(() => {
  // lock = useScrollLock(document.body);

  /**
   * @see https://github.com/vueuse/vueuse/blob/main/packages/core/useScrollLock/index.ts
   * ios直接禁止了touchmove事件
   */
  watchEffect(() => {
    document.body.style.overflow = !!previewId.value ? 'hidden' : 'auto'
    // lock.value = !!previewId.value
  })
})

const onPostLick = (post: Post) => {
  previewId.value = post.id;
}

const exitPreview = () => {
  // lock.value = false;
  const dom = document.querySelector(`#post_${[previewId.value]}`) as HTMLLIElement;
  Object.assign(dom.style, {
    top: '',
  })
  previewId.value = '';
}

const onLongPress = (e: MouseEvent) => {
  e.preventDefault()
}

</script>

<style lang="postcss">
.close {
  transition: top 300ms linear 300ms;

  &.postPreiview {
    @apply visible right-4 top-4;
  }
}
</style>