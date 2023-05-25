<template>
  <Banner></Banner>
  <div class=" min-h-screen">
    <h1 class="text-center">{{ tag }}</h1>
    <PostCard :posts="list" />
  </div>
</template>

<script setup lang="ts">
const route = useRoute();
const { params } = route;
const tag = params.tag as string

useHead({
  title: `tag: | ${tag}`
})
const list = ref<Post[]>([])

const fetchTags = () => $fetch(`/api/tags/${tag}`, { method: 'GET', params: { tag: tag } });
const { data } = useAsyncData('tag', fetchTags);

if (data.value) {
  list.value = data.value;
}

</script>

<style scoped></style>
