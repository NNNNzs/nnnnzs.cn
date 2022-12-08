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
let Query, query;

const postList = ref<Post[]>([]);
const params = reactive({
  pageNum: 1,
  pageSize: 20
});

onMounted(() => {
  console.log('window.AV', window.AV)
  Query = window.AV.Query;
  query = new Query("Counter");
})

const { data, pending } = await useAsyncData('homePageData', async ctx => {
  let res = await getPostList(params)
  return res;
});

const elRef = ref<HTMLElement | null>(null);

const patchLikes = () => {
  const unlist = postList.value.filter(e => !e.visitors).map(e => e.title)
  // console.log(unlist);
  // postList.value.filter(e => !e.visitors).forEach(async (e, index) => {
  //   const title = e.title;
  //   query.equalTo('title', title).first().then(t => {
  //     const likes = t?.get('likes')
  //     const visitors = t?.get('visitors');
  //     const url = t?.get('url');
  //     e.likes = likes;
  //     e.visitors = visitors;
  //     e.url = url;
  //   })
  // });
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
