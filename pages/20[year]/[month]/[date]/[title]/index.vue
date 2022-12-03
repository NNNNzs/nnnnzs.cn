<template>
  <NuxtLayout>
    <Banner :cover="post?.cover"></Banner>
    <div id="post" class="center text-left w-3/5 m-auto border-l-fuchsia-900">
      <div class="container m-auto w-10/12 max-w-screen-lg">
        <h1 class="text-left my-4">{{ title }}</h1>
      </div>
      <div class="full">
        <MdEditor :showCodeRowNumbe="true" codeTheme="github" v-model="post.content" :previewOnly="true"></MdEditor>
      </div>
    </div>
    <Footer />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Post } from "@/types/index";
import { SendOutlined } from "@ant-design/icons-vue";
import { getPostById } from '@/api/post'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const route = useRoute();
const { params } = route;
const { title } = params;
const post = reactive<Post>({
  title: '',
  path: '',
  content: '',
  cover: '',
  tags: "",
  date: "",
  description: "",
});

useHead({
  title: title as string,
});

const { data } = await useAsyncData('post', async () => {
  if (Array.isArray(title)) {
    let res = await getPostById(title[0]);
    return res;
  } else {
    let res = await getPostById(title);
    return res;
  }
})

Object.assign(post, data.value);


</script>
<style scoped>

</style>
