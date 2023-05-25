<template>
  <ul>
    <li v-for="(post, index) in posts" :key="post.title" @click="handlePostClick(post)" :id="`post_${post.id}`"
      class="post flex flex-col m-auto w-10/12 lg:w-5/6 md:w-10/12 max-w-screen-lg bg-white  transition-all duration-500 ease-in-out"
      :class="[index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse',
      previewId === post.id ? 'fixed fixedCard overflow-auto !w-screen h-screen left-0 top-0 right-0 z-10 ' : 'my-8']">
      <a class="post-cover w-full lg:w-3/5 text-center" :target="target" :href="toLink(post)" :title="post.title">
        <img class="w-full max-h-96 h-auto  lg:rounded-xl hover:shadow-2xl" :src="homeThumbnail(post.cover)"
          :data-src="homeThumbnail(post.cover)" />
      </a>

      <div
        class="post-text  text-left w-full p-6 lg:w-2/5 lg:relative lg:top-4 lg:border lg:border-gray-300 border border-gray-300 border-t-0"
        :class="[index % 2 === 0 ? 'lg:border-l-0' : 'lg:border-r-0']">
        <p class="post-time text-gray-300">
          {{ dateFormat(post?.date) }}
        </p>
        <h2 class="post-title text-gray-900 text-2xl my-4">
          <a :href="toLink(post)" class="WenYueQingLongTi" :title="post.title" :target="target">
            {{ post.title }}
          </a>
          <!-- <a style="margin-left:10px" :href="toEdit(post)" :target="target">编辑</a> -->
        </h2>
        <div class="post-tags">
          <span v-for="tag in   post.tags.split(',')" :key="tag">
            <a :href="`/tags/${tag}/`" :target="target">
              {{ tag }}
            </a>
          </span>
        </div>
        <p class="post-description text-gray-500 leading-10">
          {{ post?.description }}
        </p>
        <p class="post-content text-gray-500 leading-10">
          <ClientOnly>
            <MdEditor editor-id="post-editor" preview-theme="cyanosis" v-model="contentMap[post.id]" :previewOnly="true">
            </MdEditor>
          </ClientOnly>
        </p>
        <p class="post-meta">
          <span class="leancloud_visitors my-6">
            <i class="iconfont icon-eye"></i>热度<i>{{ post?.visitors }}</i>
          </span>

          <span class="leancloud_likes">
            <i class="iconfont icon-collection"></i>喜欢<i>{{ post?.likes }}</i>
          </span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { homeThumbnail } from "../utils/img";
import dayjs from "dayjs";
import { getPostById } from "~~/api/post";
import MdEditor from 'md-editor-v3';
import { breakpointsTailwind } from '@vueuse/core'

const props = defineProps({
  posts: {
    type: Array as PropType<Post[]>,
    default: () => [],
  },
});

const contentMap = reactive<Record<number | string, string>>({})

const target = '_blank';

const dateFormat = (date: string | undefined | Date) => {
  if (!date) return "";
  return dayjs(date).format("MM月 DD日, YYYY");
};

const previewId = ref<string | number>('')

let lock = ref(false);
let breakpoints: any
onMounted(() => {
  lock = useScrollLock(document.body);
  breakpoints = useBreakpoints(breakpointsTailwind);
})

const handlePostClick = (post: Post) => {

  if (breakpoints.greater('lg').value) {
    return false;
  }
  // 初次
  if (previewId.value === '') {
    previewId.value = post.id as string
    // lock.value = true;
    if (!contentMap[post.id]) {
      getPostById(post.id).then(res => {
        if (post.id && res?.content) {
          contentMap[post.id] = res?.content
        }
      })
    }
  } else if (previewId.value === post.id) {
    // 退出
    lock.value = false;
    previewId.value = ''
  }
}

const toLink = (post: Post) => {
  const { path } = post;
  return path
};

const toEdit = (post: Post) => {
  const { id } = post;
  return `/c/edit/${id}`;
}

</script>

<style lang="less">
.post {
  // transition:left 5s linear 0s,top 5s linear 0,width 2s linear 3s;
  transition: height 100ms linear 100ms, width 300ms linear 0s, left 300ms linear 1s, top 300ms linear 1s, ;
  // border-radius: 3em;
}

.post-content,
.post-description {
  word-break: break-all;
}

.post-content {
  display: none;
}

.fixedCard {

  .post-meta {
    display: none;
  }

  .post-description {
    display: none;
  }

  .post-content {
    display: block;
  }
}
</style>