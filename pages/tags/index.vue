<template>
  <ClientOnly>
    <Banner></Banner>
    <div class="w-full h-screen " ref="wordCloud"></div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { getTags } from '~~/api/post';
const wordCloud = ref<HTMLElement | null>(null)
type Entry = [string, number]
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
  getTags().then(res => {
    let list: Entry[] = []
    list = res.data.data
    // res.data.data.forEach((e: Entry) => {
    //   let [name, num] = e;
    //   while (num > 0) {
    //     list.push([name, 1])
    //     num--;
    //   }
    // });
    if (wordCloud.value) {

      window.WordCloud(wordCloud.value, {
        list: list,
        // clearCanvas: true,
        // drawMask:true,
        gridSize: 20,
        classes: 'cursor-pointer',
        // fontWeight: 500,
        shape: "cardioid",
        click: clickFun
      })
    }
  })
})



</script>

<style>

</style>
