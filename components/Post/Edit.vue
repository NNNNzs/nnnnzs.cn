<template>
  <div
    class="w-screen h-screen overflow-y-auto padding-8 editor flex flex-col"
  >
    <ElForm
      :model="post"
      inline
      class="form"
      :rules="rules"
      :label-width="120"
      label-position="right"
    >
      <div class="flex justify-between">
        <ElFormItem class="flex-1" label="标题" prop="title">
          <ElInput v-model="post.title"></ElInput>
        </ElFormItem>

        <ElFormItem class="flex-1" label="标签" prop="tagsString">
          <ElSelect
            v-model="post.tagsString"
            filterable
            multiple
            clearable
            allow-create
            class="w-full"
          >
            <ElOption
              v-for="item in tags"
              :value="item[0]"
              :label="item[0]"
            ></ElOption>
          </ElSelect>
        </ElFormItem>

        <ElFormItem class="flex-1" label="发布日期" prop="date">
          <ElDatePicker type="datetime" v-model="post.date"></ElDatePicker>
        </ElFormItem>

        <ElFormItem class="flex-1" label="更新日期" prop="updated">
          <ElDatePicker
            disabled
            type="datetime"
            :model-value="post.updated"
          ></ElDatePicker>
        </ElFormItem>

        <ElFormItem class="flex-1" label="发布" prop="hide">
          <ElRadioGroup v-model="post.hide">
            <ElRadio label="是" value="0"></ElRadio>
            <ElRadio label="否" value="1"></ElRadio>
          </ElRadioGroup>
          <!-- <ElDatePicker type="datetime" v-model="post.updated"></ElDatePicker> -->
        </ElFormItem>
      </div>
      <div class="flex flex-row justify-between">
        <ElFormItem class="flex-1" label="描述" prop="description">
          <ElInput v-model="post.description"></ElInput>
        </ElFormItem>

        <ElFormItem class="flex-1" label="背景图" prop="cover">
          <ElInput style="width: 320px" v-model="post.cover"></ElInput>
        </ElFormItem>
        <ElFormItem class="flex-1" label="访客数" prop="visitors">
          <ElInputNumber
            controls-position="right"
            v-model="post.visitors"
          ></ElInputNumber>
        </ElFormItem>
        <ElFormItem class="flex-1" label="点赞" prop="likes">
          <ElInputNumber
            controls-position="right"
            v-model="post.likes"
          ></ElInputNumber>
        </ElFormItem>
        <ElFormItem class="flex-1" prop="cover">
          <ElButton @click="genDescription">生成描述</ElButton>
          <ElButton @click="genCover">生成背景</ElButton>
          <ElButton @click="saveMeta">保存</ElButton>
        </ElFormItem>
      </div>
    </ElForm>
    <MdEditor
      :codeFoldable="false"
      @save="saveMeta"
      @onUploadImg="onUploadImg"
      class="MdEditor flex-1 overflow-hidden"
      v-model="post.content"
    ></MdEditor>
  </div>
</template>

<script setup name="edit" lang="ts">
import { MdEditor } from "md-editor-v3"
import {
  ElSelect,
  ElOption,
  ElInput,
  ElInputNumber,
  ElForm,
  ElFormItem,
  ElButton,
  ElDatePicker,
  ElMessage,
  ElRadio,
  ElRadioGroup
} from "element-plus"
import dayjs from "dayjs"
import { upload } from "@/api/fs"
import { CDN_URL } from "@/composables/cdn"
import { cloneDeep } from "lodash-es"

const props = defineProps({
  id: {
    type: [String, Number]
  }
})

type Entry = [string, number]

const tags: Entry[] = (await $fetch(`/api/tags`, {
  method: "GET"
}))!.filter((e) => e[0])

const route = useRoute()
const { params } = route
const id = props.id || (params.id as string)
const rules = {
  title: { required: true }
}

const post = reactive<PostAdd & { tagsString?: string[] }>({
  title: "",
  path: "",
  oldTitle: "",
  content: "",
  cover: "",
  tags: "",
  date: new Date(),
  description: "",
  updated: new Date(),
  hide: "1",
  likes: 0,
  visitors: 0,
  tagsString: []
})

const getPost = () => {
  if (id !== "edit") {
    $fetch("/api/post/detail", {
      method: "GET",
      params: { title: id }
    }).then((res) => {
      Object.assign(post, res)
      if (post.tags) {
        post.tagsString = post.tags.split(",")
      }
    })
  }
}

onMounted(() => {
  getPost()
})

const router = useRouter()

const saveMeta = () => {
  const { path, oldTitle } = genPath(post)
  const p = cloneDeep(Object.assign(post, { path, oldTitle }))

  if (post.tagsString) {
    p.tags = post.tagsString.join(",")
  }
  p.tagsString = void 0

  if (id === "edit") {
    $fetch(clientUrl + "/post/create", {
      method: "POST",
      body: p
    }).then((r) => {
      const res = r as ResponeBody<Post>
      const id = res.data.id
      router.replace(EDIT_PAGE + id)
      ElMessage.success("保存成功")
    })
  } else {
    $fetch(clientUrl + `/post/${id}`, {
      method: "PUT",
      body: p
    }).then((r) => {
      const res = r as ResponeBody
      if (res.status) {
        ElMessage.success("保存成功")
        getPost()
      }
    })
  }
}

const genDescription = () => {
  post.description =
    document
      .querySelector("#md-editor-v3-preview")
      ?.textContent?.substring(0, 77) + "..."
}

const genCover = () => {
  post.cover = `https://static.nnnnzs.cn/bing/${dayjs(post.date).format("YYYYMMDD")}.png`
}

const onUploadImg = async (
  files: Blob[],
  callback: (str: string[]) => string[]
) => {
  console.log("on UploadImage")
  const queue: Promise<string>[] = files.map((file) => {
    return new Promise((resolve, reject) => {
      const { success, error, response } = upload(file)
      const cancel = watchEffect(() => {
        if (success.value) {
          resolve(response.value)
          cancel()
        }
        if (error.value) {
          reject(response.value)
        }
      })
    })
  })
  const res = await Promise.all(queue)

  callback(res)
}

watchEffect(() => {
  useHead({
    title: `编辑 | ${post.title}`
  })
})
</script>

<style lang="less">
@import url("~/assets/css/hide-fe.less");
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
