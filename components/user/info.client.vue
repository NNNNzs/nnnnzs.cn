<template>
  <div class="w-full h-full flex flex-col justify-center items-center">
    <ElForm
      :model="userInfo"
      label-position="top"
      ref="formRef"
      class="p-4 w-5/6"
    >
      <ElFormItem prop="id" label="ID">
        <ElInput v-model="userInfo.id" disabled></ElInput>
      </ElFormItem>
      <ElFormItem prop="account" label="账号">
        <ElInput v-model="userInfo.account" disabled></ElInput>
      </ElFormItem>
      <ElFormItem prop="nickname" label="昵称">
        <ElInput v-model="userInfo.nickname"></ElInput>
      </ElFormItem>

      <ElFormItem prop="nickname" label="邮箱">
        <ElInput v-model="userInfo.mail"></ElInput>
      </ElFormItem>

      <ElFormItem prop="nickname" label="头像">
        <div>
          <ElAvatar
            v-if="userInfo.avatar"
            :size="80"
            :src="userInfo.avatar"
          ></ElAvatar>
        </div>

        <div>
          <ElUpload
            action="."
            :http-request="customUpload"
            :accept="'.png,.jpg,.jpeg,.webp,.gif,.svg'"
            :show-file-list="false"
          >
            <ElButton>更新头像</ElButton>
          </ElUpload>
        </div>

        <ElDialog v-model="showDialog" title="图片裁剪">
          <VuePictureCropper
            :boxStyle="boxStyle"
            :img="pic"
            :options="options"
            @ready="ready"
            ref="cropperRef"
          />
          <template #footer>
            <ElButton @click="showDialog.value = false">取消</ElButton>
            <ElButton type="primary" @click="uploadImage">确定</ElButton>
          </template>
        </ElDialog>
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="submit">提交</ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import {
  ElFormItem,
  ElForm,
  ElInput,
  ElButton,
  ElUpload,
  ElDialog,
  ElAvatar,
  ElMessage
} from "element-plus"
import VuePictureCropper, { cropper } from "vue-picture-cropper"
import { upload } from "@/api/fs"

const userInfo = useUserInfoStore()
const pic = ref("https://static.nnnnzs.cn/bing/20230727.png")

const boxStyle = {
  width: "600px",
  height: "600px",
  backgroundColor: "#f8f8f8",
  margin: "auto"
}
const options = {
  viewMode: 1,
  dragMode: "crop",
  aspectRatio: 1 / 1
}
const cropperRef = ref(null)
const showDialog = ref(false)
const ready = () => {}

const customUpload = async ({ file }: { file: File }) => {
  showDialog.value = true
  pic.value = URL.createObjectURL(file)
  return
}

const uploadImage = async () => {
  const file = (await cropper?.getBlob()) as Blob
  const { success, response } = upload(file)
  const effect = watchEffect(() => {
    if (success.value) {
      showDialog.value = false
      userInfo.avatar = response.value
      effect()
    }
  })
}

const submit = async () => {
  try {
    const sendInfo = userInfo.$state

    const res = await $fetch(clientUrl + `/user/${userInfo.id}`, {
      method: "PATCH",
      body: sendInfo
    })
    userInfo.getInfo()
    ElMessage.success("修改成功")
  } catch (error) {
    userInfo.getInfo()
    ElMessage.error("修改失败")
  }
}
</script>

<style scoped></style>
