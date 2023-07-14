<template>
  <div class="full padding-8 editor">
    <ClientOnly>
      <ElForm :model="post" inline class="form" :rules="rules" :label-width="70">
        <div>
          <ElFormItem label="标题" prop="title">
            <ElInput v-model="post.title"></ElInput>
          </ElFormItem>

          <ElFormItem label="标签" prop="tagsString">
            <ElSelect v-model="post.tagsString" filterable multiple clearable allow-create class="w-[400px]">
              <ElOption v-for="item in tags" :value="item[0]" :label="item[0]"></ElOption>
            </ElSelect>
          </ElFormItem>

          <ElFormItem label="发布日期" prop="date">
            <ElDatePicker type="datetime" v-model="post.date"></ElDatePicker>
          </ElFormItem>

          <ElFormItem label="更新日期" prop="updated">
            <ElDatePicker disabled type="datetime" :model-value="post.updated"></ElDatePicker>
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
      <MdEditor @save="saveMeta" @onUploadImg="onUploadImg" class="MdEditor" v-model="post.content"></MdEditor>
    </ClientOnly>

  </div>
</template>

<script setup name="edit" lang="ts">
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ElSelect, ElOption, ElInput, ElInputNumber, ElForm, ElFormItem, ElButton, ElDatePicker, ElMessage, ElRadio, ElRadioGroup } from 'element-plus';
import dayjs from 'dayjs'
import { upload } from '@/api/fs'

const props = defineProps({
  id: {
    type: [String, Number]
  }
})
definePageMeta({
  middleware: ['auth']
});

useHead({
  link: [
    {
      rel: "stylesheet",
      href: "/css/element-plus.css"
    }
  ]
})
type Entry = [string, number]

const tags: Entry[] = await $fetch(`/api/tags`, { method: 'GET' })

const route = useRoute();
const { params } = route;
const id = props.id || params.id as string;
const rules = {
  title: { required: true },
}

const post = reactive<PostAdd & { tagsString?: string[] }>({
  title: '',
  path: '',
  oldTitle: '',
  content: '',
  cover: '',
  tags: "",
  date: new Date(),
  description: "",
  updated: new Date(),
  hide: '1',
  likes: 0,
  visitors: 0,
  tagsString: []
});

const getPost = () => {
  if (id !== 'edit') {
    $fetch('/api/post', { method: 'GET', params: { title: id } }).then(res => {
      Object.assign(post, res)
      post.tagsString = post.tags.split(',')
    })
  }
};

onMounted(() => {
  getPost()
})

const router = useRouter()

const saveMeta = () => {
  const { path, oldTitle } = genPath(post)
  Object.assign(post, { path, oldTitle })
  post.updated = void 0;
  
  if (post.tagsString) {
    post.tags = post.tagsString.join(',');
  }
  post.tagsString = void 0;

  if (id === 'edit') {
    $fetch('/api/post/create', {
      method: "POST",
      body: post
    }).then(post => {
      const id = post.id;
      router.replace(EDIT_PAGE + id)
      ElMessage.success('保存成功');
    })
  } else {

    $fetch('/api/post/update', {
      method: 'PUT',
      query: { id },
      body: post
    }).then(res => {
      if (res.status) {
        ElMessage.success('保存成功');

        getPost()

      } else {

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

const onUploadImg = async (files: Blob[], callback: (str: string[]) => string[]) => {
  console.log('on UploadImage')
  const queue: Promise<string>[] = files.map(file => {
    return new Promise((resolve, reject) => {
      const { success, error, response } = upload(file)
      const cancel = watchEffect(() => {
        if (success.value) {
          resolve(response.value);
          cancel()
        }
        if (error.value) {
          reject(response.value)
        }
      })
    })
  });
  const res = await Promise.all(queue)

  callback(res);
};

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