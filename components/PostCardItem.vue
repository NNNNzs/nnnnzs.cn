<template>
  <li class="max-h-[30rem] md:h-auto post flex-col md:flex-row md:rounded-none md:even:flex-row-reverse" ref="postRef"
    @click="handlePostClick(post)" :id="`post_${post.id}`" :class="[
    ]">

    <div class="post-cover w-full lg:w-3/5 text-center rounded-t-[1em] bg-transparent">
      <img v-lazyload class="w-full h-48 md:max-h-96 md:h-auto md:hover:shadow-2xl lg:rounded-xl  rounded-t-[1em]"
        :data-src="homeThumbnail(post.cover)" />
    </div>

    <div
      class="post-text bg-white text-left w-full p-4 lg:w-2/5 lg:relative lg:top-4 lg:border lg:border-gray-300 border-gray-300 border-t-0 even:lg:border-l-0 odd:lg:border-r-0">
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
          <MdEditor editor-id="post-editor" preview-theme="cyanosis" :value="cache" :previewOnly="true">
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
import dayjs from "dayjs";
import { getPostById } from "~~/api/post";
import MdEditor from 'md-editor-v3';
import { breakpointsTailwind } from '@vueuse/core'
const target = '_blank';

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

let lock = ref(false);
let breakpoints: any
onMounted(() => {
  lock = useScrollLock(document.body);
  breakpoints = useBreakpoints(breakpointsTailwind);
})

const cache = ref('')
const postRef = ref<HTMLLIElement | null>(null)

const toLink = (post: Post) => {
  const { path } = post;
  return path
};

const handlePostClick = (post: Post) => {
  const dom = postRef.value as HTMLLIElement
  const { top } = dom.getBoundingClientRect();

  if (breakpoints.greater('lg').value) {
    return false;
  }
  const offsetTop = useCssVar('--offset-top', dom);

  Object.assign(dom.style, {
    top: `${top}px`,
  });

  offsetTop.value = `${-top}px`

  if (!cache.value) {
    lock.value = true;
    cache.value = post.id as string
    if (!cache.value) {
      getPostById(post.id).then(res => {
        if (post.id && res?.content) {
          cache.value = res?.content
        }
      })
    }
  }

}

const dateFormat = (date: string | undefined | Date) => {
  if (!date) return "";
  return dayjs(date).format("MM月 DD日, YYYY");
};
</script>