<template>
  <div class="full padding-8 editor">
    <ClientOnly>
      <ElForm :model="post" inline class="form" :rules="rules" :label-width="70">
        <div>
          <ElFormItem label="标题" prop="title">
            <ElInput v-model="post.title"></ElInput>
          </ElFormItem>

          <ElFormItem label="标签" prop="tags">
            <ElInput v-model="post.tags"></ElInput>
          </ElFormItem>

          <ElFormItem label="发布日期" prop="date">
            <ElDatePicker type="datetime" v-model="post.date"></ElDatePicker>
          </ElFormItem>

          <ElFormItem label="更新日期" prop="updated">
            <ElDatePicker disabled type="datetime" v-model="post.updated"></ElDatePicker>
          </ElFormItem>

          <ElFormItem label="发布" prop="hide">
            <ElRadioGroup v-model="post.hide">
              <ElRadio label="0">是</ElRadio>
              <ElRadio label="1">否</ElRadio>

            </ElRadioGroup>
            <!-- <ElDatePicker type="datetime" v-model="post.updated"></ElDatePicker> -->
          </ElFormItem>

        </div>
        <div>
          <ElFormItem label="描述" prop="description">
            <ElInput v-model="post.description"></ElInput>
          </ElFormItem>

          <ElFormItem label="背景图" prop="cover">
            <ElInput style="width:320px" v-model="post.cover"></ElInput>
          </ElFormItem>
          <ElFormItem label="访客数" prop="visitors">
            <ElInputNumber controls-position="right" v-model="post.visitors"></ElInputNumber>
          </ElFormItem>
          <ElFormItem label="点赞" prop="likes">
            <ElInputNumber controls-position="right" v-model="post.likes"></ElInputNumber>
          </ElFormItem>
          <ElFormItem prop="cover">
            <ElButton @click="genDescription">生成描述</ElButton>
            <ElButton @click="genCover">生成背景</ElButton>
            <ElButton @click="saveMeta">保存</ElButton>
          </ElFormItem>
        </div>
      </ElForm>
      <MdEditor @save="saveMeta" class="MdEditor" v-model="post.content"></MdEditor>
    </ClientOnly>

  </div>

</template>

<script setup name="edit" lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { getPostById, updateById, createPost } from '@/api/post'
import { ElInput, ElInputNumber, ElForm, ElFormItem, ElButton, ElDatePicker, ElMessage, ElRadio, ElRadioGroup } from 'element-plus';
import dayjs from 'dayjs'

const props = defineProps({
  id: {
    type: [String, Number]
  }
})

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/css/element-plus.css"
    }
  ]
})

const route = useRoute();
const { params } = route;
const id = props.id || params.id as string;
const rules = {
  title: { required: true },
}

const post = reactive<Post>({
  title: '',
  path: '',
  oldTitle: '',
  content: '',
  cover: '',
  tags: "",
  date: new Date(),
  description: "",
  updated: new Date(),
  hide: '',
  likes: 0,
  visitors: 0
});


onMounted(() => {
  getPostById(id as string).then(data => {
    Object.assign(post, data)
  })
})

const router = useRouter()
const saveMeta = () => {
  const { path, oldTitle } = genPath(post)
  Object.assign(post, { path, oldTitle })
  if (id === 'edit') {
    createPost(post).then(res => {
      if (res.data.status) {
        ElMessage.success('保存成功');
        const id = res.data.data.id;
        router.replace(`/edit/${id}`)
      }
    })
  } else {
    updateById(id + '', post).then(res => {
      if (res.data.status) {
        ElMessage.success('保存成功');
        getPostById(id as string).then(data => {
          Object.assign(post, data);
        })
      }
    })
  }
}

const genDescription = () => {
  post.description = document.querySelector('#md-editor-v3-preview')?.textContent?.substring(0, 77) + '...';
}

const genCover = () => {
  post.cover = `https://static.nnnnzs.cn/bing/${dayjs(post.date).format('YYYYMMDD')}.png`
}

watchEffect(() => {
  useHead({
    title: `编辑 | ${post.title}`,
  });
})

</script>

<style lang="less" >
.editor {
  padding: 10px;
  box-sizing: border-box;

  .form {
    height: 100px;
  }

  .md-editor {
    height: calc(100vh - 200px);
  }
}
</style>