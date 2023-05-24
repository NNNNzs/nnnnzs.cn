<template>
  <div ref="elRef">
    <Banner />
    <PostCardHome :posts="postList" />
    <div class="WenYueQingLongTi cursor-pointer text-center" @click="loadMore">加载更多</div>
    <Footer />
  </div>
</template>

<script lang="ts" setup>
const postList = ref<Post[]>([]);
const params = reactive({
  pageNum: 1,
  pageSize: 20
});

const fetchPost = () => $fetch(`/api/getPostList`, { query: params });

const { data, refresh } = await useAsyncData('homePageData', fetchPost);

const elRef = ref<HTMLElement | null>(null);

const patchLikes = () => {

}

if (data.value?.record) {
  postList.value = data.value.record;
  patchLikes();
}

const loadMore = async () => {
  params.pageNum++

  const res = await $fetch(`/api/getPostList`, { query: params });

  res?.record?.forEach(t => {
    postList.value.push(t)
  })

};


</script>
