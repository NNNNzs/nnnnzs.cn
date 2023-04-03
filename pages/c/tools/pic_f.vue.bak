<template>
  <div class="h-full w-full flex flex-row">
    <div class="w-1/2 h-full flex flex-row">
      <div class="w-5/6 h-full overflow-auto">
        <div :id="item.date" class="" v-for="item in picList">
          <div>{{ item.date }}</div>
          <div class="w-full flex flex-row flex-wrap">
            <img class="w-1/4" v-for="p in item?.images" style="object-fit:contain" @click="currentImg = p" alt=""
              srcset="" v-lazyload :data-src="`http://localhost${p.filePath}`" src="https://static.nnnnzs.cn/bing/20230202.png?imageMogr2/thumbnail/680x/format/webp/interlace/1/quality/100">
          </div>
        </div>
      </div>

      <div class="w-1/6 h-full overflow-auto flex flex-col ">
        <a :href="`#${item.date}`" class="border" :class="{ 'bg-blue-300': item.date === currentD }"
          v-for="item in picList">
          <div>{{ item.date }}</div>
          <div>{{ item.count }}</div>
        </a>
      </div>

    </div>

    <div class="w-1/2 h-full">
      <MdEditor class="h-full" v-model="value" :previewOnly="true"></MdEditor>
      <div class="h-1/12"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import json from './zList.json';
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import dayjs from 'dayjs'

interface ImgInfo {
  isVideo: boolean;
  md5: string;
  filePath: string;
  time: string;
  repeat: string[]
}

interface DateInfo {
  date: string
  count: number,
  images: ImgInfo[]
}

const daySet = new Map<string, DateInfo>();

const picList = ref<DateInfo[]>([])

json.forEach((t: ImgInfo) => {
  const d = dayjs(t.time).format('YYYY-MM-DD');
  if (daySet.has(d)) {
    const dateInfo = daySet.get(d);
    if (dateInfo) {
      dateInfo.count++
      dateInfo.images.push(t)
    }
  } else {
    const z: DateInfo = { date: d, count: 1, images: [t] }
    daySet.set(d, z)
    picList.value.push(z)
  }
});

const jumpTo = (item: ImgInfo) => {
  index.value = json.findIndex(t => dayjs(t.time).format('YYYY-MM-DD') === item.d)
}

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/css/element-plus.css"
    }
  ]
});

onMounted(() => {
  window.addEventListener("keydown", e => {
    if (e.key === 'ArrowRight') {
      index.value++
    }
    if (e.key === 'ArrowLeft') {
      index.value--
    }
  })
})

const current = ref<DateInfo>();
const currentImg = ref<ImgInfo>()

const value = computed(() => {
  return "```json\n" + JSON.stringify(currentImg.value, null, 2) + "\n```"
})

const index = ref(0)

const currentD = computed(() => {
  return dayjs(current.value?.date).format('YYYY-MM-DD');
})

watchEffect(() => {
  current.value = picList.value[index.value];
})

</script>

<style scoped></style>