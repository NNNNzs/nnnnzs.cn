<template>
  <li
    class="post max-h-[30rem] md:h-auto flex-col md:flex-row md:even:flex-row-reverse rounded-2xl bg-white dark:bg-slate-800 group"
    ref="postRef"
    @click="handlePostClick(post)"
    :id="`post_${post.id}`"
    :class="[{ preview }]"
  >
    <div class="post-cover w-full md:w-3/5 text-center bg-transparent">
      <img
        v-lazyload
        class="w-full h-48 md:max-h-96 md:h-full md:hover:shadow-2xl rounded-t-xl md:rounded-2xl group-even:md:rounded-l-none group-odd:md:rounded-r-none"
        :data-src="homeThumbnail(post.cover)"
      />
    </div>

    <div
      class="post-text dark:border-none bg-white dark:bg-slate-800 text-left w-full p-4 md:w-2/5 md:relative md:border md:border-gray-300 border-t-0 even:lg:border-l-0 odd:lg:border-r-0"
    >
      <p class="post-time text-gray-300">
        {{ dateFormat(post?.date) }}
      </p>
      <h2
        class="post-title md:line-clamp-1 text-slate-950 dark:text-white text-2xl my-4 bg-white dark:bg-slate-800"
      >
        <a
          :href="toLink(post)"
          class="WenYueQingLongTi"
          :title="post.title"
          :target="target"
        >
          {{ post.title }}
        </a>
      </h2>
      <PostCardTags :post="post"></PostCardTags>
      <p
        class="post-description hidden md:block md:h-[11rem] text-gray-500 leading-10"
      >
        {{ post?.description }}
      </p>
      <p
        class="post-content bg-white dark:bg-slate-800 text-gray-500 leading-10"
      >
        <ClientOnly>
          <MdPreview
            previewTheme="cyanosis"
            :editor-id="`post-editor-${post.id}`"
            :theme="theme"
            :model-value="cache"
            :previewOnly="true"
          >
          </MdPreview>
        </ClientOnly>
      </p>

      <p
        class="text-slate-700 dark:text-slate-400 post-meta hidden md:block"
      >
        <span class="leancloud_visitors my-6 mr-4">
          <svg-icon name="eye"></svg-icon>热度<i>{{ post?.visitors }}</i>
        </span>

        <span class="leancloud_likes">
          <svg-icon name="collection"></svg-icon>喜欢<i>{{
            post?.likes
          }}</i>
        </span>
      </p>
    </div>
  </li>
</template>

<script lang="ts" setup>
import type { PropType } from "vue"
import { homeThumbnail } from "@/utils/img"
import { MdPreview } from "md-editor-v3"
import { breakpointsTailwind } from "@vueuse/core"
import { dateFormat } from "~/composables/date"
import { isDark } from "~/composables/useSystemDark"

const target = "_blank"

const props = defineProps({
  post: {
    type: Object as PropType<Post>,
    default: () => ({})
  },
  preview: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(["on-click"])
const postRef = ref<HTMLLIElement | null>(null)
const cache = ref("")

// const { pressed } = useMousePressed({ target: postRef.value })
const theme = computed(() => {
  return isDark.value ? "dark" : "light"
})

let breakpoints: any

onMounted(() => {
  breakpoints = useBreakpoints(breakpointsTailwind)
})

const toLink = (post: Post) => {
  const { path } = post
  return path
}

const handlePostClick = (post: Post) => {
  if (breakpoints.greater("md").value) {
    return
  }
  if (props.preview) {
    return
  }
  const dom = postRef.value as HTMLLIElement
  const { top } = dom.getBoundingClientRect()
  const offsetTop = useCssVar("--offset-top", dom)

  Object.assign(dom.style, {
    top: `${top}px`
  })

  offsetTop.value = `${-top}px`
  if (!cache.value) {
    $fetch(`/api/post/detail`, {
      method: "GET",
      query: { title: post.id }
    }).then((res: Post) => {
      cache.value = res.content
    })
  }
  emit("on-click", post)
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
    @apply shadow-2xl;
  }

  transition:
    height calc(1 * var(--base-duration)) var(--cubic-line) 0s,
    max-height calc(3 * var(--base-duration)) linear 0s,
    width var(--base-duration) var(--cubic-line)
      calc(1 * var(--base-delay)),
    transform calc(1 * var(--base-duration)) var(--cubic-line)
      calc(1 * var(--base-delay)),
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
  }

  &-text {
    transform: height var(--base-duration) 300ms var(--cubic-line)
      var(--base-delay);
  }

  &-cover {
    img {
      transition: border-radius var(--base-duration) var(--cubic-line)
        var(--base-delay);
    }
  }

  &.preview {
    @apply fixed overflow-auto !w-screen max-h-screen min-h-screen z-50 my-0 flex flex-col;
    transform: translateY(var(--offset-top));

    &,
    .post-cover,
    .post-cover img {
      border-radius: unset;
    }

    .post-time {
      padding-top: 1rem;
    }

    .post-text {
      height: auto;
      /* overflow: auto; */
      padding-top: 0px;
    }

    .post-title {
      position: sticky;
      top: 0rem;
    }

    .post-cover img {
      @apply rounded-none;
    }

    .post-content {
      display: block;
    }
  }
}

.dark .post .md-editor-dark {
  --md-bk-color: theme(colors.slate.800);
}
</style>
