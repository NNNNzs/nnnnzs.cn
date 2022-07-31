<template>
  <NuxtLayout>
    <Banner :cover="cover"></Banner>
    <div id="post" class="center text-left w-3/5 m-auto border-l-fuchsia-900">
      <div class="container m-auto w-10/12 max-w-screen-lg">
        <h1 class="text-left my-4">
          <SendOutlined class="align-middle relative -top-1 text-xl mr-3" />
          <span>{{ title }}</span>
        </h1>
        <PostMeta :meta="meta"></PostMeta>
      </div>
      <div>
        <Viewer :plugins="plugins" :value="content"></Viewer>
      </div>
      <!-- <Editor :value="contentValue" :plugins="plugins" @change="handleChange"></Editor> -->
    </div>
  </NuxtLayout>
</template>

<script lang="ts">
import { Viewer } from "@bytemd/vue-next";
import gfm from "@bytemd/plugin-gfm";
import hightlight from "@bytemd/plugin-highlight-ssr";
import List from "/Users/nnnnzs/project/blog/data.json";
import "bytemd/dist/index.css";
import { Post } from "@/types/index";
import { SendOutlined } from "@ant-design/icons-vue";

export default {
  name: "PostDetail",
  components: { Viewer, SendOutlined },
  setup() {
    const plugins = [gfm(), hightlight()];

    const route = useRoute();
    const { params } = route;
    const { title } = params;

    useHead({
      title: title as string,
    });

    const { content, origin, meta, html } = List.find((e) => e.title === title) as Post;
    const { cover } = meta;

    const contentValue = ref(content);

    console.log(content);

    const handleChange = (v) => {
      console.log("new Content", v);
    };
    return {
      meta,
      title,
      html,
      content,
      plugins,
      contentValue,
      handleChange,
      cover,
    };
  },
};
</script>
<style scoped></style>
