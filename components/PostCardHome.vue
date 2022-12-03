<template>
  <ul>
    <li v-for="(post, index) in posts" :key="post.title"
      class="post md:p-2 my-8 flex m-auto w-full lg:w-5/6 md:w-10/12 flex-col max-w-screen-lg transition-all duration-500"
      :class="[index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse']">
      <a class="post-cover w-full lg:w-3/5 text-center" :href="toLink(post)" :title="post.title">
        <img class="w-full h-auto rounded-b-none lg:rounded-xl" :src="homeThumbnail(post.cover)"
          data-src="https://static.nnnnzs.cn/bing/20210912.png?imageMogr2/thumbnail/680x/format/webp/interlace/1/quality/100" />
      </a>
      <div
        class="post-text text-left w-full p-6 lg:w-2/5 lg:relative lg:top-4 lg:border lg:border-gray-300 border border-gray-300 border-t-0"
        :class="[index % 2 === 0 ? 'lg:border-l-0' : 'lg:border-r-0']">
        <p class="post-time text-gray-300">
          {{ dateFormat(post?.date) }}
        </p>
        <h3 class="post-title text-gray-900 text-2xl my-4">
          <a :href="toLink(post)" class="WenYueQingLongTi" :title="post?.title">
            <SendOutlined class="align-middle relative -top-1 text-xl mr-3" />{{
                post?.title
            }}
          </a>
        </h3>
        <p class="post-content text-gray-500 leading-10">
          <!-- {{ post?.content }} -->
          22
        </p>
        <span class="" v-for="tag in post?.tags" :key="tag">
          <a :href="`/tags/${tag}/`">
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
</script>
