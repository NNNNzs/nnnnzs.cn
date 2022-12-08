<template>
  <div class="full padding-8 editor">
    <ClientOnly>
      <ElForm :model="post" inline class="form" :rules="rules">
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
            <ElDatePicker type="datetime" v-model="post.updated"></ElDatePicker>
          </ElFormItem>
          <ElFormItem prop="cover">
            <ElButton @click="genDescription">生成描述</ElButton>
            <ElButton @click="genCover">生成背景</ElButton>
            <ElButton @click="saveMeta">保存</ElButton>
          </ElFormItem>
        </div>
        <div>
          <ElFormItem label="描述" prop="description">
            <ElInput v-model="post.description"></ElInput>
          </ElFormItem>

          <ElFormItem label="背景图" prop="cover">
            <ElInput style="width:600px" v-model="post.cover"></ElInput>
          </ElFormItem>
        </div>
      </ElForm>
      <MdEditor class="MdEditor" v-model="post.content"></MdEditor>
    </ClientOnly>

  </div>

</template>

<script setup name="edit" lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { getPostById, updateById } from '@/api/post'
import { ElInput, ElForm, ElFormItem, ElButton, ElDatePicker, ElMessage } from 'element-plus';
import dayjs from 'dayjs'

const route = useRoute();
const { params } = route;
const id = params.id as string;
const rules = {
  title: { required: true },
}

const post = reactive<Post>({
  title: '',
  path: '',
  content: '',
  cover: '',
  tags: "",
  date: "",
  description: "",
  updated: new Date(),
});


onMounted(() => {
  getPostById(id as string).then(data => {
    Object.assign(post, data)
  })
})



const saveMeta = () => {
  updateById(id, post).then(res => {
    if (res.data.status) {
      ElMessage.success('保存成功');
      getPostById(id as string).then(data => {
        Object.assign(post, data);
      })
    }
  })
}

const genDescription = () => {
  post.description = document.querySelector('#md-editor-v3-preview')?.textContent?.substring(0, 77) + '...';
}

const genCover = () => {
  post.cover = `https://static.nnnnzs.cn/bing/${dayjs(post.date).format('YYYYMMDD')}.png`
}

useHead({
  title: `编辑 | ${post.title}`,
  link: [
    {
      rel: "stylesheet",
      href: "//cdn.jsdelivr.net/npm/element-plus/dist/index.css",
    }
  ]
});

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