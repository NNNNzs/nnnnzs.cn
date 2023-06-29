<template>
  <ul>
    <li v-for="(post, index) in  posts " class="post flex-col active:shadow-2xl md:flex-row rounded-b-[1em] md:rounded-none" :key="post.id"
      @click="handlePostClick(post)" :id="`post_${post.id}`" :class="[
        { preview: previewId === post.id },
        { 'md:flex-row-reverse': index % 2 === 1 }
      ]">

      <div class="post-cover w-full lg:w-3/5 text-center ">
        <img v-lazyload class="w-full max-h-96 h-auto  lg:rounded-xl md:hover:shadow-2xl rounded-t-[1em]"
          :data-src="homeThumbnail(post.cover)" />
      </div>

      <div
        class="post-text text-left w-full p-4 lg:w-2/5 lg:relative lg:top-4 lg:border lg:border-gray-300 border border-gray-300 border-t-0"
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
            <MdEditor editor-id="post-editor" preview-theme="cyanosis" v-model="contentMap[post.id]" :previewOnly="true">
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
  </ul>

  <div :class="{ postPreiview: !!previewId }" class="close text-white top-[-2em]" @click.stop="exitPreview()">
    <el-icon size="30">
      <CircleClose />
    </el-icon>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import { homeThumbnail } from "../utils/img";
import dayjs from "dayjs";
import { getPostById } from "~~/api/post";
import MdEditor from 'md-editor-v3';
import { breakpointsTailwind } from '@vueuse/core'
// import { CloseCircleOutlined } from "@ant-design/icons-vue";
import { ElIcon } from "element-plus";
import { CircleClose } from '@element-plus/icons-vue'

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
  const { top } = dom.getBoundingClientRect();

  if (breakpoints.greater('lg').value) {
    return false;
  }
  const offsetTop = useCssVar('--offset-top', dom);

  Object.assign(dom.style, {
    top: `${top}px`,
  })
  offsetTop.value = `${-top}px`

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

const exitPreview = () => {
  lock.value = false;
  const dom = document.querySelector(`#post_${[previewId.value]}`) as HTMLLIElement;
  Object.assign(dom.style, {
    top: '',
    bottom: '',
  })
  previewId.value = '';
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
  --cubic-line: cubic-bezier(0, 0, 0.13, 1.82);
  /* --cubic-line: cubic-bezier(0, 1, 0.95, 1.05); */
  --base-duration: 600ms;
  --base-delay: 100ms;


  transition:
    /* height calc(3 * var(--base-duration)) var(--cubic-line) 0s, */
    width var(--base-duration) var(--cubic-line) calc( 3 * var(--base-delay)),
    transform 300ms var(--cubic-line) var(--base-delay);
  @apply flex relative m-auto w-11/12 max-w-screen-lg bg-white my-8 shadow-md left-0 right-0 overflow-hidden;

  &-content,
  &-description,
  &-meta,
  &-tags {
    word-break: break-all;
  }

  &-content {
    transform: height calc(3 * var(--base-duration)) var(--cubic-line) 10s;
    height: 0;
  }

  &-text {
    display: block;
    transform: height var(--base-duration) 300ms var(--cubic-line) var(--base-delay);
  }

  &.preview {
    @apply fixed overflow-auto !w-screen h-screen z-10 my-0 pointer-events-none;
    transform: translateY(var(--offset-top));

    .post-cover img {
      transition: border-radius var(--base-duration) var(--cubic-line) 0s;
      @apply rounded-none;
    }

    .post-content {
      height: 100vh;
    }

    .post-text {
      display: block;
      transform: height var(--base-duration) 300ms var(--cubic-line) var(--base-delay);
    }
  }

}


.close {
  @apply fixed block invisible w-8 h-8 z-20;
  transition: top 300ms linear 300ms;

  &.postPreiview {
    @apply visible right-4 top-4;
  }
}
</style>