<template>
  <ul class="transition-all duration-500">
    <li v-for="(post, index) in posts" :key="post.title"
      class="post p-2 my-8 flex m-auto w-11/12 lg:w-5/6 md:w-10/12 flex-col max-w-screen-lg "
      :class="[index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse']">
      <a class="post-cover w-full lg:w-3/5 text-center  " :target="target" :href="toLink(post)" :title="post.title">
        <img class="w-full max-h-96 h-auto rounded-b-none lg:rounded-xl hover:shadow-2xl" :src="homeThumbnail(post.cover)"
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
          <a style="margin-left:10px" :href="toEdit(post)" :target="target">编辑</a>
        </h2>
        <span v-for="tag in post.tags.split(',')" :key="tag">
          <a :href="`/tags/${tag}/`" :target="target">
            {{ tag }}
          </a>
        </span>
        <p class="post-content text-gray-500 leading-10">
          {{ post?.description }}
        </p>
        <p class="post-meta">
          <span class="leancloud_visitors my-6" id="/2021/09/12/吾爱吾师-吾更爱真理/_visitors">
            <i class="iconfont icon-eye"></i>
            热度
            <i>{{ post?.visitors }}</i>
          </span>

          <span class="leancloud_likes">
            <i class="iconfont icon-collection"></i>
            喜欢
            <i>{{ post?.likes }}</i>
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
const props = defineProps({
  posts: {
    type: Array as PropType<Post[]>,
    default: () => [],
  },
});




const target = '_self';

const dateFormat = (date: string | undefined | Date) => {
  if (!date) return "";
  return dayjs(date).format("MM月 DD日, YYYY");
};

const toLink = (post: Post) => {
  const { path } = post;
  return path
};

const toEdit = (post: Post) => {
  const { id } = post;
  return `/edit/${id}`;
}

</script>
