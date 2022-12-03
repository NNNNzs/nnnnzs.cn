<template>
  <div ref="elRef">
    <Banner />
    <PostCardHome :posts="postList" />
    <div class="WenYueQingLongTi cursor-pointer text-center" @click="loadMore">加载更多</div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { defineComponent, ref } from "vue";
import cloneDeep from "lodash/cloneDeep";
import { Post } from "../types/index";
import axios from "axios";
import { getPostList } from '@/api/post'
const postList = ref<Post[]>([]);

const params = reactive({
  pageNum: 1,
  pageSize: 10
});

const { data, pending } = await useAsyncData('homePageData', async ctx => {
  let res = await getPostList(params)
  return res;
});

const elRef = ref<HTMLElement | null>(null);

const t = useScroll(elRef);

watch(() => t.arrivedState, n => {
  console.log("n", n)
})

postList.value = data.value.record;

const loadMore = () => {
  params.pageNum++
  getPostList(params).then(res => {
    res.record.forEach(t => {
      postList.value.push(t)
    })
  })
};


</script>
