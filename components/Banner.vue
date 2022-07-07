<template>
  <div
    class="banner relative h-screen bg-fixed bg-cover flex justify-center items-center"
    :style="bannerStyle"
  >
    <div class="antialiased text-2xl WenYueQingLongTi text-white">
      <p class="mb-20">{{ oneText.hitokoto }}</p>
      <p class="text-center" v-if="Boolean(oneText.from)">
        {{ oneText.from }}-{{ oneText.creator }}
      </p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import dayjs from "dayjs";
import axios, { AxiosResponse } from "axios";

interface HitokotoData {
  creator: string;
  from?: string;
  hitokoto: string;
}

const props = defineProps({
  cover: {
    type: String,
    default: `https://static.nnnnzs.cn/bing/${dayjs().format("YYYYMMDD")}.png`,
  },
});
const bannerStyle = ref({
  "background-image": `url(${props.cover})`,
});

const oneText = ref<HitokotoData>({
  creator: "出入相友，守望相助",
  from: "每日一习话",
  hitokoto: "acking",
});

// const { data } = await useAsyncData("getHit", () => {
//   return axios.get<HitokotoData>("https://api.lwl12.com/hitokoto/");
// });

axios.get("https://v1.hitokoto.cn/").then((res) => {
  oneText.value = res.data as HitokotoData;
});
const loadHitokoto = () => {};

// loadHitokoto();
</script>
