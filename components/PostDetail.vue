<template>
    <NuxtLayout>
        <Banner :cover="post?.cover"></Banner>
        <div id="post" class="center text-left lg:w-3/5 sm:w-full md:w-3/5 m-auto border-l-fuchsia-900 p-8">
            <div class="m-auto   mb4">
                <h1 class="text-center my-4 text-4xl WenYueQingLongTi">{{ title }}</h1>
            </div>
            <div class="meta text-center text-gray-600 mb-4">
                <i class="iconfont  icon-calendaralt-fill"></i>
                <span>发表于:{{ fomat(post?.date) }}</span>
                <i class="iconfont  icon-tag-fill"></i>
                <span>{{ post.tags }}</span>
                <i class="iconfont  icon-eye"></i>
                <span>热度:{{ post.visitors }}</span>
                <i class="iconfont  icon-collection"></i>
                <span @click="addLike">喜欢:{{ post.likes }}</span>
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
import { getPostById, getLikeAndFav, FavType } from '@/api/post'
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import dayjs from "dayjs";

const route = useRoute();
const { params } = route;
const title = params.title as string

const post = reactive<Post>({
    id: '',
    title: '',
    path: '',
    content: '',
    cover: '',
    tags: "",
    date: "",
    updated: "",
    description: "",

    hide: '0',
    visitors: 0,
    likes: 0,
});

const router = useRouter()

const { data } = await useAsyncData('post', async () => {
    return await getPostById(title);
})

const fomat = (t: string | Date) => {
    return dayjs(t).format('YYYY-MM-DD HH:mm')
}
Object.assign(post, data.value);
if (!post.title) {
    router.push('/404')
}

useHead({
    title: title,
    meta: [
        { name: 'keywords', content: post.tags + ',' + post.description },
        { name: 'description', content: post.description }
    ]
})


const addVisitor = () => {
    if (post.id) {
        getLikeAndFav(post.id, FavType.visitors)
        post.visitors++
    }
}

const addLike = () => {
    if (post.id) {
        getLikeAndFav(post.id, FavType.likes)
        post.likes++
    }
}

onMounted(() => {
    addVisitor();
    useHeic2Any();
})
</script>
<style scoped>
.meta .iconfont {
    margin-right: 0.5em;
}

.meta span {
    margin-right: 2em;
}
</style>
  