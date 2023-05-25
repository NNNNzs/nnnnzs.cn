<template>
  <ClientOnly>
    <Banner></Banner>
  </ClientOnly>
  <div>
    <NuxtLink v-for="item in list" :to="`/tags/${item[0]}`"></NuxtLink>
  </div>
  <div class="w-full h-screen bg-neutral-600" ref="wordCloudRef"></div>
</template>

<script setup lang="ts">
import { getTags } from '~~/api/post';
const wordCloudRef = ref<HTMLElement | null>(null)
type Entry = [string, number]

const fetchTags = () => $fetch(`/api/tags`, { method: 'GET' });
const { data } = useAsyncData('tags', fetchTags);
const list = ref<Entry[]>([])
if (data.value) {
  list.value = data.value;
}

useHead({
  title: '标签',
  script: [
    { src: '/js/wordcloud2.js' }
  ]
});

const clickFun = (item: Entry) => {
  const [tag] = item;
  const path = `/tags/${tag}`
  window.open(path)
}

onMounted(() => {
  if (wordCloudRef.value) {

    window.WordCloud(wordCloudRef.value, {
      list: list.value,
      // clearCanvas: true,
      // drawMask:true,
      gridSize: 30,
      classes: 'cursor-pointer',
      // fontWeight: 500,
      shape: "cardioid",
      click: clickFun
    })
  }
})



</script>

<style></style>
