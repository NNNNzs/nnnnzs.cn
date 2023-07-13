<template>
  <Banner></Banner>
  <div class="min-h-screen tag-detail">
    <h1 class="text-center text-[4rem] text-white tagh1 WenYueQingLongTi ">
      {{ tag }}
    </h1>
    <PostCard :posts="list" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { params } = route;
const tag = params.tag as string

useHead({
  title: `tag: | ${tag}`,
})
const list = ref<Post[]>([])

const fetchTags = () => $fetch(`/api/tags/${tag}`, { method: 'GET', params: { tag: tag } });
const { data } = useAsyncData('tag', fetchTags);

if (data.value) {
  list.value = data.value;
}

</script>

<style scoped lang="postcss">

.tag-detail {
  background: linear-gradient(45deg, #bfbfbf, #e6e6e6);

  .tagh1 {
    color: #e6e6e6;
    letter-spacing: 5px;
    text-shadow: 1px -1px #fff,
      -1px 1px #999,
      -5px 5px #80808080;
  }
}
</style>
