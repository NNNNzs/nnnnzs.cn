<template>
  <div>
    <Banner />
    <PostCardHome :posts="postList" />
    <div class="WenYueQingLongTi cursor-pointer" @click="loadMore">加载更多</div>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import cloneDeep from "lodash/cloneDeep";
import { Post } from "../types/index";
import axios from "axios";
const postList = ref<Post[]>();

const { data, pending } = await useAsyncData('homePageData', async ctx => {
  const res = await axios.get('https://api.nnnnzs.cn/V2/post/findNews')
  if (res.status) {
    return res.data.data.record;
  }
});

postList.value = data.value;

const loadMore = () => {
};

loadMore()

</script>
