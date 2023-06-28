<template>
  <ul>
    <li v-for="(post, index) in  posts " class="post flex-col md:flex-row" :key="post.id" @click="handlePostClick(post)"
      :id="`post_${post.id}`" :class="[
        { preview: previewId === post.id },
        { 'md:flex-row-reverse': index % 2 === 1 }
      ]">
      <div class="close top-[-2em]" @click.stop="exitPreview(post)">X</div>

      <div class="post-cover w-full lg:w-3/5 text-center">
        <img class="w-full max-h-96 h-auto  lg:rounded-xl hover:shadow-2xl" v-lazyload
          :data-src="homeThumbnail(post.cover)" />
      </div>

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
          <span v-for=" tag  in    post.tags.split(',') " :key="tag">
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
  const dom = document.querySelector(`#post_${[post.id]}`) as HTMLLIElement;
  const { left, top } = dom.getBoundingClientRect();

  if (breakpoints.greater('lg').value) {
    return false;
  }
  console.log('top', top);
  Object.assign(dom.style, {
    top: top + 'px',
    left: "0px",
    right: '0px'
  })

  setTimeout(() => {
    Object.assign(dom.style, {
      top: '0px',
      bottom: '0px',
      left: "0px",
      right: '0px'
    })
  }, 300);

  if (!previewId.value) {
    lock.value = true;
    previewId.value = post.id as string
    if (!contentMap[post.id]) {
      getPostById(post.id).then(res => {
        if (post.id && res?.content) {
          contentMap[post.id] = res?.content
        }
      })
    }
  }

}

const exitPreview = (post: Post) => {
  lock.value = false;
  previewId.value = '';
  const dom = document.querySelector(`#post_${[post.id]}`) as HTMLLIElement;
  Object.assign(dom.style, {
    left: '',
    right: '',
    top: '',
    bottom: '',
  })
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

<style lang="postcss">
.post {
  --base-line: 1;
  /* transition: height 100ms linear 100ms, width 300ms linear 0s, left 300ms linear 1s, top 300ms linear 1s, ; */
  transition: top 10s linear 0ms, left 300ms linear 0ms, width 600ms linear 1s;
  @apply flex relative m-auto w-5/6 max-w-screen-lg bg-white transition-all duration-500 ease-in-out my-8;

  &.preview {
    @apply fixed overflow-auto !w-screen h-screen z-10 my-0 top-0;

    .close {
      @apply visible right-4 top-4;
    }

    .post-meta,
    .post-description {
      @apply hidden;
    }

    .post-content {
      display: block;
    }
  }

  .close {
    transition: top 0.3s linear 300ms;
    @apply fixed block invisible;
  }
}

.post-content,
.post-description {
  word-break: break-all;
}

.post-content {
  display: none;
}
</style>