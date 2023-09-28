<template>
  <NuxtLayout>
    <Banner :cover="post?.cover"></Banner>
    <div id="post" class="center text-left lg:w-3/5 sm:w-full md:w-3/5 m-auto border-l-fuchsia-900 p-8">
      <div class="m-auto mb4">
        <h1 class="text-gray-900 dark:text-white text-center my-4 text-4xl WenYueQingLongTi">
          {{ title }}
        </h1>
      </div>
      <div class="meta text-center text-gray-600 mb-4">
        <svg-icon name="calendar" class="mr-2"></svg-icon>
        <span class="mr-8">发表于:{{ fomat(post?.date) }}</span>
        <svg-icon name="tag-fill" class="mr-2"></svg-icon>
        <span class="mr-8">{{ post.tags }}</span>
        <svg-icon name="eye" class="mr-2"></svg-icon>
        <span class="mr-8">热度:{{ post.visitors }}</span>
        <svg-icon name="collection" class="mr-2"></svg-icon>
        <span @click="addLike">喜欢:{{ post.likes }}</span>
      </div>
      <div class="full text-slate-700">
        <MdEditor editor-id="post-editor" preview-theme="cyanosis" :showCodeRowNumbe="true" :model-value="post.content"
          :theme="theme" :previewOnly="true"></MdEditor>
      </div>
    </div>
    <Footer />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import { FavType } from "@/api/post"
import MdEditor from "md-editor-v3"
import dayjs from "dayjs"
import { isDark, toggleDark } from "~/composables/useSystemDark"

const route = useRoute()
const { params } = route
const title = params.title as string

const post = reactive<Post>({
  id: "",
  title: "",
  path: "",
  content: "",
  cover: "",
  tags: "",
  date: "",
  updated: "",
  description: "",
  hide: "0",
  visitors: 0,
  likes: 0
})

const theme = ref<'dark' | 'light'>('light');
onMounted(() => {
  theme.value = isDark.value ? "dark" : "light";

  watchEffect(() => {
    theme.value = isDark.value ? "dark" : "light"
  })
})



const router = useRouter()

const fetchPost = () =>
  $fetch(`/api/post/detail`, { method: "GET", query: { title } })
const { data } = await useAsyncData("post", fetchPost)

const fomat = (t: string | Date) => {
  return dayjs(t).format("YYYY-MM-DD HH:mm")
}

Object.assign(post, data.value)
if (!post.title) {
  router.push("/404")
}

provide('postId', post.id)

useHead({
  title: title,
  meta: [
    { name: "keywords", content: post.tags + "," + post.description },
    { name: "description", content: post.description },
    {
      name: "update",
      id: "update",
      content: dayjs(post.updated).format("YYYYMMDDHHMMss")
    }
  ]
})

const addVisitor = () => {
  if (post.id) {
    $fetch(`/api/fav`, {
      method: "PUT",
      query: { id: post.id, type: FavType.visitors }
    })
    post.visitors++
  }
}

const addLike = () => {
  if (post.id) {
    $fetch(`/api/fav`, {
      method: "PUT",
      query: { id: post.id, type: FavType.likes }
    })
    post.likes++
  }
}

onMounted(() => {
  addVisitor()
  useHeic2Any()
})
</script>
<style lang="scss">
#post .md-editor {
  --md-bk-color: #efefef;
}

.dark #post .md-editor-dark {
  --md-bk-color: theme(colors.slate.900);
}
</style>
