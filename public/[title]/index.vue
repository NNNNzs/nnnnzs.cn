<template>
  <link rel="stylesheet" href="/assets/style/rainbow.css" />
  <Common>
    <Banner :cover="post.meta.cover"></Banner>
    <!-- <link rel="stylesheet" href="https://www.nnnnzs.cn/css/Annie.css" /> -->
    <div class="container m-auto w-10/12 max-w-screen-lg">
      <h1 class="text-left my-4">
        <SendOutlined class="align-middle relative -top-1 text-xl mr-3" />{{
          post.title
        }}
      </h1>
      <div class="container text-left" v-html="post.html"></div>
    </div>
  </Common>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRoute } from "vue-router";
// import "assets/style/rainbow.css";
import { SendOutlined } from "@ant-design/icons-vue";
const cache: { [key: string]: any } = {};

export default defineComponent({
  name: "PostDetail",
  components: {
    SendOutlined,
  },
  setup() {
    const route = useRoute();
    //文章标题
    let params: string = route.params["20"] as string;
    if (params.endsWith("/")) {
      params = params.replace(/\/$/, "");
    }

    console.log("params", params);
    const title = params.split("/").pop() as string;
    const post = ref();

    if (cache[title]) {
      post.value = cache[title];
      console.log("cache hit");
    } else {
      console.log("cache miss");
      const postDetail = postList.find((e) => e.title === title);
      cache[title] = postDetail;
      post.value = postDetail;
    }

    return {
      post,
    };
  },
});
</script>

<style lang="less">
// pre code {
//   padding: 0;
//   color: #eaeaea;
//   background: none;
//   text-shadow: none;
// }
</style>