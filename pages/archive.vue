<template>
  <div>
    <Banner />

    <div
      class="flex flex-row justify-start items-center gap-2 flex-wrap w-5/6 m-auto max-w-screen-lg mt-8"
    >
      <ElBadge v-for="tag in tags" :value="tag[1]" type="primary">
        <ElTag
          class="cursor-pointer"
          :type="filterKeys.has(tag[0]) ? 'success' : 'info'"
          @click="toggleTag(tag[0])"
        >
          {{ tag[0] }}</ElTag
        >
      </ElBadge>
    </div>
    <ul
      class="flex flex-col w-5/6 m-auto max-w-screen-lg justify-start items-center text-left"
    >
      <li
        v-for="(p, index) in archiveList"
        class="timeline mb-2 font-large"
        :key="p.id"
      >
        <NuxtLink v-if="p.year"
          ><h2>{{ p.year }}年</h2></NuxtLink
        >
        <NuxtLink v-else-if="p.month"
          ><h3>{{ p.month }}月</h3></NuxtLink
        >
        <NuxtLink v-else-if="p.date" :to="p.path">
          <ElLink type="primary">{{ p.title }}</ElLink></NuxtLink
        >
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import {
  ElTimeline,
  ElTimelineItem,
  ElCard,
  ElLink,
  ElTag,
  ElBadge
} from "element-plus"
import dayjs from "dayjs"

const filterKeys = ref(new Set())
const toggleTag = (tag: string) => {
  if (filterKeys.value.has(tag)) {
    filterKeys.value.delete(tag)
  } else {
    filterKeys.value.add(tag)
  }
}

const fetchPost = () => $fetch(`/api/post/listAll`)
const fetchTags = () => $fetch(`/api/tags`, { method: "GET" })

const { data: tags } = await useAsyncData("tag", fetchTags)
let { data, refresh } = await useAsyncData("timeLine", fetchPost)

if (!data.value) {
  data.value = []
}

if (tags.value) {
  tags.value = tags.value.sort((a, b) => (a[1] < b[1] ? 1 : -1))
}

interface IArchive extends Post {
  year?: string
  month?: string
  date: string
}

let archive: IArchive[] = data.value

for (let i = 0; i < archive.length - 1; i++) {
  const e = archive[i]
  // 提取当前年份和下一年年份
  let currentYear = dayjs(e.date).format("YYYY")
  let nextYear = dayjs(archive[i + 1].date).format("YYYY")

  // 如果年份不同，插入标志位
  if (currentYear !== nextYear) {
    // 插入标志位对象
    archive.splice(i + 1, 0, { ...e, year: nextYear })
    // 由于数组长度增加，需要调整索引
    i++ // 移动到新插入的元素上
  }
  e.date = dayjs(e.date).format("YYYY-MM-DD")
}
const archiveList = computed(() => {
  if (filterKeys.value.size == 0) return archive
  return archive.filter((e) => {
    return filterKeys.value.has(e)
  })
})
</script>

<style lang="less">
.timeline {
  width: 100%;
}
</style>
