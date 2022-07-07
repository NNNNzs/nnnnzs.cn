<template>
  <div>
    <Banner :cover="cover"></Banner>
    <div id="post" class="center text-center w-4/5">
      <PostMeta :meta="meta"></PostMeta>
      <Viewer :plugins="plugins" :value="content"></Viewer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Editor, Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import hightlight from "@bytemd/plugin-highlight-ssr";
import List from "/Users/nnnnzs/project/blog/data.json";
import { Post } from "@/types/index";
const plugins = [gfm(), hightlight()];

const route = useRoute();
const { params } = route;
const { title } = params;

const { content, origin, meta } = List.find((e) => e.title === title) as Post;
const { cover } = meta;
</script>
<script lang="ts">
export default {
  name: "PostDetail",
};
</script>
<style scoped></style>
