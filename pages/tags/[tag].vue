<template>
  <Banner></Banner>
  <div>{{ tag }}</div>
  <ul>
    <li v-for="p in list" :key="p.id">{{ p.title }}</li>
  </ul>
</template>

<script setup lang="ts">
import { getListByTag } from '~~/api/post'
const route = useRoute();
const { params } = route;
const tag = params.tag as string

useHead({
  title: `tag: | ${tag}`
})
const list = ref<Post[]>([])

const { data } = useAsyncData('tags', async () => {
  const res = await getListByTag(tag)
  return res.data.data
})
if (data.value) {
  list.value = data.value;
}

</script>

<style scoped>

</style>
