<template>
  <ElForm :model="userInfo" label-width="80px">
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

      <ElAvatar v-if="userInfo.avatar" :size="80" :src="userInfo.avatar"></ElAvatar>

      <ElUpload action="." :http-request="customUpload" :accept="'.png,.jpg,.jpeg,.webp,.gif,.svg'"
        :show-file-list="false">
        <ElButton>更新头像</ElButton>
      </ElUpload>

      <ElDialog v-model="showDialog" title="图片裁剪">
        <VuePictureCropper :boxStyle="boxStyle" :img="pic" :options="options" @ready="ready" ref="cropperRef" />
        <template #footer>
          <ElButton @click="showDialog = false">取消</ElButton>
          <ElButton type="primary" @click="uploadImage">确定</ElButton>
        </template>
      </ElDialog>
    </ElFormItem>

    <ElFormItem>
      <ElButton type="primary" @click="submit">提交</ElButton>
    </ElFormItem>

  </ElForm>
</template>

<script setup lang="ts">
import { ElFormItem, ElForm, ElInput, ElButton, ElUpload, ElDialog, ElAvatar, ElMessage } from 'element-plus';
import useUserInfo from '@/composables/useUserInfo'
import VuePictureCropper, { cropper } from 'vue-picture-cropper'
import { upload } from '@/api/fs';
import axios from 'axios';

const userInfo = useUserInfo()
const pic = ref('https://static.nnnnzs.cn/bing/20230727.png')

const boxStyle = {
  width: '600px',
  height: '600px',
  backgroundColor: '#f8f8f8',
  margin: 'auto',
}
const options = {
  viewMode: 1,
  dragMode: 'crop',
  aspectRatio: 1 / 1,
}
const cropperRef = ref(null);
const showDialog = ref(false)
const ready = () => {

}

const customUpload = async ({ file }: { file: File }) => {
  showDialog.value = true;
  console.log('file', file)
  pic.value = URL.createObjectURL(file)
  return
}

const uploadImage = async () => {
  const file = await cropper?.getBlob() as Blob
  console.log('cropper', cropper, cropperRef.value)
  const { success, response } = upload(file);
  const effect = watchEffect(() => {
    if (success.value) {
      showDialog.value = false;
      userInfo.avatar = response.value;
      effect()
    }
  })
}

const submit = async () => {
  try {
    const res = await $fetch.raw(clientUrl + `/user/${userInfo.id}`, { method: 'PATCH', body: userInfo }).catch(err => err.data)

    if (res.error) {
      ElMessage.error(res.message.join(','))
    } else {
      ElMessage.success('修改成功')
    }

  } catch (error) {

  }



  // const { error, data, pending } = useFetch(clientUrl + `/user/${userInfo.id}`, { method: 'PATCH', body: userInfo });

  // watchEffect(() => {
  //   console.log('error', error.value, data.value)
  //   if (!pending.value) {
  //     if (!error.value) {
  //       ElMessage.success('修改成功');
  //     } else {
  //       console.log(error.value)
  //     }
  //   }
  // })

}

</script>

<style scoped></style>