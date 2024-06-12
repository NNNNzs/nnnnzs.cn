<template>
  <Header></Header>
  <div
    class="banner relative h-screen bg-scroll md:bg-fixed bg- bg-cover flex justify-center items-center"
    :style="bannerStyle"
  >
    <div
      class="antialiased text-2xl WenYueQingLongTi text-white hover:transition-backdrop-blur duration-300 hover:backdrop-blur-[3px] p-[2rem] mix-blend-difference"
    >
      <p class="mb-20">{{ oneText.hitokoto }}</p>
      <p class="text-center" v-if="Boolean(oneText.from)">
        {{ oneText.from }}-{{ oneText.creator }}
      </p>
    </div>
    <div
      @click="scrollIntoPost"
      class="animate-bounce absolute left-0 right-0 bottom-1 text-center cursor-pointer text-white"
    >
      <svg-icon name="paper-plane" class="text-4xl w-4 h-4"></svg-icon>
    </div>
  </div>
  <div ref="anchorRef"></div>
</template>

<script lang="ts" setup>
import { ref } from "vue"
import dayjs from "dayjs"
import { getHitokoto } from "@/api/hitokoto"
const props = defineProps({
  cover: {
    type: String,
    default: `https://static.nnnnzs.cn/bing/${dayjs().format("YYYYMMDD")}.png`
  },
  autoScroll: {
    type: Boolean,
    default: true
  }
})
const anchorRef = ref<HTMLElement>()
const bannerStyle = ref({
  "background-image": `url(${props.cover})`
})

const oneText = ref<HitokotoData>({
  creator: "",
  from: "",
  hitokoto: ""
})

getHitokoto().then((res) => {
  oneText.value = res
})
const route = useRoute()
onMounted(() => {
  if (!route.hash && props.autoScroll && window.scrollY === 0) {
    setTimeout(() => {
      scrollIntoPost()
    }, 1000)
  }
})

const scrollIntoPost = () => {
  anchorRef.value &&
    anchorRef.value.scrollIntoView({
      behavior: "smooth"
    })
}

// loadHitokoto();
</script>
