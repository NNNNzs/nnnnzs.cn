<template>
  <div ref="elRef">
    <Banner />
    <PostCardHome :posts="postList" />
    <div class="WenYueQingLongTi cursor-pointer text-center" @click="loadMore">加载更多</div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
import { getPostList } from '@/api/post'
// import AV from 'leancloud-storage/core'
const postList = ref<Post[]>([]);
const params = reactive({
  pageNum: 1,
  pageSize: 20
});

const { data, pending } = await useAsyncData('homePageData', async ctx => {
  return await getPostList(params)
});

const elRef = ref<HTMLElement | null>(null);

const patchLikes = () => {

}
if (data.value?.record) {
  postList.value = data.value.record;
  patchLikes();
}

const loadMore = () => {
  params.pageNum++
  getPostList(params).then(res => {
    if (res) {
      res.record?.forEach(t => {
        postList.value.push(t)
      })
    }
  })
};


</script>
