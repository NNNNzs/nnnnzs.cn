<template>
  <Banner />
  <PostCardHome :posts="postList" />
  <div class="WenYueQingLongTi cursor-pointer" @click="loadMore">加载更多</div>
</template>

<script lang="ts" setup>
import { defineComponent, onMounted, ref } from "vue";
import cloneDeep from "lodash/cloneDeep";
import List from "/Users/nnnnzs/project/blog/data.json";
import { Post } from "../types/index";

const postList = List.sort((a, b) => {
  return new Date(a.meta.date) < new Date(b.meta.date) ? 1 : -1;
}).filter((e) => !e.meta.disable) as Post[];

let currentPage = 1;

const posts = ref<Post[]>([]);

const pageSize = 5;

const loadMore = () => {
  let data = cloneDeep(postList);
  let startIndex = (currentPage - 1) * pageSize; //开始位置的索引
  let endIndex = startIndex + pageSize; //结束位置的索引
  // todo 这里不应该any
  let current: any[] = data.slice(startIndex, endIndex);

  current.forEach((e) => {
    posts.value.push(e);
  });
  currentPage++;
};
loadMore();
// onMounted(() => {});
</script>
