<template>
  <div>
    <Banner :cover="cover"></Banner>
    <div id="post" class="center text-left w-3/5 m-auto border-l-fuchsia-900">
      <PostMeta :meta="meta"></PostMeta>
      <div class="container m-auto w-10/12 max-w-screen-lg">
        <h1 class="text-left my-4">
          <SendOutlined class="align-middle relative -top-1 text-xl mr-3" />
          <span>{{ title }}</span>
        </h1>
        <div class="container text-left" v-html="html"></div>
      </div>
      <!-- <Editor :value="contentValue" :plugins="plugins"></Editor> -->
      <!-- <Viewer :plugins="plugins" :value="content"></Viewer> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { Editor, Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import hightlight from "@bytemd/plugin-highlight-ssr";
import List from "/Users/nnnnzs/project/blog/data.json";
import "@/assets/css/rainbow.css";
import { Post } from "@/types/index";
const plugins = [gfm(), hightlight()];

const route = useRoute();
const { params } = route;
const { title } = params;

const { content, origin, meta, html } = List.find((e) => e.title === title) as Post;
const contentValue = ref(content);
const { cover } = meta;
</script>
<script lang="ts">
export default {
  name: "PostDetail",
};
</script>
<style scoped></style>
