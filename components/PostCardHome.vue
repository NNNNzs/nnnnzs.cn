<template>
  <ul class="transition-all duration-500">
    <li v-for="(post, index) in posts" :key="post.title"
      class="post md:p-2 my-8 flex m-auto w-full lg:w-5/6 md:w-10/12 flex-col max-w-screen-lg "
      :class="[index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse']">
      <a class="post-cover w-full lg:w-3/5 text-center" target="_blank" :href="toLink(post)" :title="post.title">
        <img class="w-full h-auto rounded-b-none lg:rounded-xl" :src="homeThumbnail(post.cover)"
          :data-src="homeThumbnail(post.cover)" />
      </a>

      <div
        class="post-text text-left w-full p-6 lg:w-2/5 lg:relative lg:top-4 lg:border lg:border-gray-300 border border-gray-300 border-t-0"
        :class="[index % 2 === 0 ? 'lg:border-l-0' : 'lg:border-r-0']">
        <p class="post-time text-gray-300">
          {{ dateFormat(post?.date) }}
        </p>
        <h3 class="post-title text-gray-900 text-2xl my-4">
          <a :href="toEdit(post)" target="_blank">编辑</a>
          <a :href="toLink(post)" class="WenYueQingLongTi" :title="post.title" target="_blank">
            <SendOutlined class="align-middle relative -top-1 text-xl mr-3" />{{
                post.title
            }}
          </a>
        </h3>
        <p class="post-content text-gray-500 leading-10">
          {{ post?.description }}
        </p>
        <span v-for="tag in post.tags.split(',')" :key="tag">
          <a :href="`/tags/${tag}/`" target="_blank">
            {{ tag }}
          </a>
        </span>

        <p class="post-meta">
          <span class="leancloud_visitors my-6" id="/2021/09/12/吾爱吾师-吾更爱真理/_visitors">
            <i class="fa fa-eye"></i>
            热度
            <i class="leancloud_visitors_count" id="leancloud_visitors_count">19</i>
          </span>

          <span class="leancloud_likes" id="/2021/09/12/吾爱吾师-吾更爱真理/_likes" data-url="/2021/09/12/吾爱吾师-吾更爱真理/">
            <i class="fa fa-heart"></i>
            喜欢
            <i class="leancloud_likes_count" id="leancloud_likes_count">0</i>
          </span>
        </p>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { defineComponent, PropType } from "vue";
import { SendOutlined } from "@ant-design/icons-vue";
import { Post } from "../types/index";
import { homeThumbnail } from "../utils/img";
import dayjs from "dayjs";

defineProps({
  posts: {
    type: Array as PropType<Post[]>,
    default: () => [],
  },
});

const dateFormat = (date: string | undefined | Date) => {
  if (!date) return "";
  return dayjs(date).format("MM月 DD日, YYYY");
};

const toLink = (post: Post) => {
  const { path, date } = post;
  return `/${dayjs(date).format("YYYY/MM/DD")}/${path}/`;
};

const toEdit = (post: Post) => {
  const { id } = post;
  return `/edit/${id}`;
}

</script>
