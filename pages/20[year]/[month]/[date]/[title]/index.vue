<template>
  <NuxtLayout>
    <Banner :cover="post?.cover"></Banner>
    <div id="post" class="center text-left lg:w-3/5 sm:w-full md:w-3/5 m-auto border-l-fuchsia-900">
      <div class="m-auto   mb4">
        <h1 class="text-center my-4 text-4xl WenYueQingLongTi">{{ title }}</h1>
      </div>
      <div class="meta text-center text-gray-600 mb-4">
        <i class="iconfont  icon-tag-fill"></i>
        <span>更新于:{{ post?.updated }}</span>
        <i class="iconfont  icon-calendaralt-fill"></i>
        <span>{{ post.tags }}</span>
        <i class="iconfont  icon-eye"></i>
        <span>热度:{{ meta.visitors }}</span>
        <i class="iconfont  icon-collection"></i>
        <span @click="addLike">喜欢:{{ meta.likes }}</span>
      </div>
      <div class="full text-slate-700">
        <MdEditor editor-id="post-editor" class="text-slate-700" :showCodeRowNumbe="true" preview-theme="cyanosis"
          v-model="post.content" :previewOnly="true"></MdEditor>
      </div>
    </div>
    <Footer />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { Post } from "@/types/index";
import { getPostById } from '@/api/post'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { Query, User, Object as AvObject } from "leancloud-storage";
const query = new Query("Counter");
const route = useRoute();
const { params } = route;
const title = params.title as string
useHead({
  title: title
})
const meta = reactive({
  visitors: 0,
  likes: 0,
  objectId: ''
});

const post = reactive<Post>({
  title: '',
  path: '',
  content: '',
  cover: '',
  tags: "",
  date: "",
  updated: "",
  description: "",
});

onMounted(() => {
  query.equalTo('title', title).first().then(t => {
    meta.visitors = t?.get('visitors');
    meta.likes = t?.get('likes');
    meta.objectId = t?.get('objectId');
    addVisitor()
  });
});

const addVisitor = () => {
  const post = AvObject.createWithoutData('Counter', meta.objectId);
  post.increment('visitors', 1)
  post.save();
  meta.visitors++
}

const addLike = () => {
  const post = AvObject.createWithoutData('Counter', meta.objectId);
  post.increment('likes', 1)
  post.save();
  meta.likes++
}

const { data } = await useAsyncData('post', async () => {
  return await getPostById(title);
})

Object.assign(post, data.value);


</script>
<style scoped>
.meta .iconfont {
  margin-right: 0.5em;
}

.meta span {
  margin-right: 2em;
}
</style>
