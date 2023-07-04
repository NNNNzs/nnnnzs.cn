<template>
  <li class="post max-h-[30rem] md:h-auto flex-col md:flex-row md:even:flex-row-reverse rounded-2xl md:11/12"
    ref="postRef" @click="handlePostClick(post)" :id="`post_${post.id}`" :class="[
      { preview }
    ]">
    <div class="post-cover w-full  md:w-3/5 text-center  bg-transparent md:rounded-2xl">
      <img v-lazyload class="w-full h-48 md:max-h-96 md:h-auto md:hover:shadow-2xl rounded-t-xl md:rounded-2xl"
        :data-src="homeThumbnail(post.cover)" />
    </div>

    <div
      class="post-text bg-white text-left w-full p-4 md:w-2/5 md:relative md:border md:border-gray-300  border-t-0 even:lg:border-l-0 odd:lg:border-r-0">
      <p class="post-time text-gray-300">
        {{ dateFormat(post?.date) }}
      </p>
      <h2 class="post-title text-gray-900 text-2xl my-4">
        <a :href="toLink(post)" class="WenYueQingLongTi" :title="post.title" :target="target">
          {{ post.title }}
        </a>
        <!-- <a style="margin-left:10px" :href="toEdit(post)" :target="target">编辑</a> -->
      </h2>
      <div class="post-tags hidden md:block">
        <span v-for=" tag  in    post.tags.split(',') " :key="tag">
          <a :href="`/tags/${tag}/`" :target="target">
            {{ tag }}
          </a>
        </span>
      </div>
      <p class="post-description hidden md:block text-gray-500 leading-10">
        {{ post?.description }}
      </p>
      <p class="post-content text-gray-500 leading-10">
        <ClientOnly>
          <MdEditor :editor-id="`post-editor-${post.id}`" preview-theme="cyanosis" v-model="cache" :previewOnly="true">
          </MdEditor>
        </ClientOnly>
      </p>
      <p class="post-meta hidden md:block">
        <span class="leancloud_visitors my-6">
          <i class="iconfont icon-eye"></i>热度<i>{{ post?.visitors }}</i>
        </span>

        <span class="leancloud_likes">
          <i class="iconfont icon-collection"></i>喜欢<i>{{ post?.likes }}</i>
        </span>
      </p>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { homeThumbnail } from "../utils/img";
import { getPostById } from "~~/api/post";
import MdEditor from 'md-editor-v3';
import { breakpointsTailwind } from '@vueuse/core';
import { dateFormat } from "~/composables/date";
const target = '_blank';

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    default: () => ({}),
  },
  preview: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(['on-click']);
const postRef = ref<HTMLLIElement | null>(null);
const cache = ref('')

const { pressed } = useMousePressed({ target: postRef.value })

watchEffect(() => {
  if (pressed) {
  }
})

let breakpoints: any

onMounted(() => {
  breakpoints = useBreakpoints(breakpointsTailwind);
})


const toLink = (post: Post) => {
  const { path } = post;
  return path
};

const handlePostClick = (post: Post) => {
  if (breakpoints.greater('md').value) {
    return false;
  }
  if (props.preview) {
    return false
  }
  const dom = postRef.value as HTMLLIElement
  const { top } = dom.getBoundingClientRect();
  const offsetTop = useCssVar('--offset-top', dom);

  Object.assign(dom.style, {
    top: `${top}px`,
  });

  offsetTop.value = `${-top}px`
  if (!cache.value) {
    getPostById(post.id).then(res => {
      if (post.id && res?.content) {
        cache.value = res?.content
      }
    })
  }
  emit('on-click', post)
}

</script>

<style lang="postcss">
.post {
  --cubic-line: cubic-bezier(0, 0, 0.13, 1.82);
  /* --cubic-line: cubic-bezier(0, 1, 0.95, 1.05); */
  --base-duration: 300ms;
  --base-delay: calc(0.5 * var(--base-duration));

  &:hover,
  .active {
    @apply shadow-2xl touch-pinch-zoom;
  }



  transition: height calc(1 * var(--base-duration)) var(--cubic-line) 0s,
  max-height calc(1 * var(--base-duration)) var(--cubic-line) 0s,
  width var(--base-duration) var(--cubic-line) calc(1 * var(--base-delay)),
  transform calc(1 * var(--base-duration)) var(--cubic-line) calc(1 * var(--base-delay)),
  border-radius var(--base-duration) var(--cubic-line) 0s;
  @apply flex m-auto w-5/6 max-w-screen-lg my-8 shadow-md left-0 right-0 overflow-hidden;

  &-content,
  &-description,
  &-meta,
  &-tags {
    word-break: break-all;
  }

  &-content {
    transform: height calc(1 * var(--base-duration)) var(--cubic-line) 0;
    overflow: hidden;
    display: none;
    background-color: #fff;
  }

  &-text {
    transform: height var(--base-duration) 300ms var(--cubic-line) var(--base-delay);
  }

  &-cover {
    img {
      transition: border-radius var(--base-duration) var(--cubic-line) var(--base-delay);
    }
  }

  &.preview {
    @apply fixed overflow-auto !w-screen max-h-screen min-h-screen z-10 my-0 flex flex-col;
    transform: translateY(var(--offset-top));

    &,
    .post-cover,
    .post-cover img {
      border-radius: unset;
    }

    .post-text {
      min-height: calc(100vh - 12rem);
    }

    .post-cover img {
      @apply rounded-none;
    }

    .post-content {
      display: block;
    }
  }

}
</style>