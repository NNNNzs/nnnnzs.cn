<template>
  <div class="w-screen h-screen flex justify-center items-center md:mr-20">
    <ElForm label-width="80px" :model="logonForm" @submit.native.prevent :rules="rules" class="bg-white p-8">
      <ElFormItem label="用户名" prop="username">
        <ElInput v-model="logonForm.username"></ElInput>
      </ElFormItem>

      <ElFormItem label="密码" prop="password">
        <ElInput type="password" v-model="logonForm.password"></ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElButton :loading="loading" type="primary" @click="login">登录</ElButton>
      </ElFormItem>

    </ElForm>
  </div>
</template>
<script setup lang="ts">
import { reactive } from 'vue';
import { ElForm, ElInput, ElFormItem, ElMessage, ElButton } from 'element-plus';

useHead({
  title: '登录',
});

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
  ]
}
const logonForm = reactive({
  username: 'NNNNzs',
  password: '123456',
})
const loading = ref(false)
const router = useRouter()
const login = () => {
  loading.value = true;
  $fetch(clientUrl + '/user/login', {
    method: 'POST',
    body: logonForm
  }).then(r => {
    const res = r as ResponeBody<{ token: string, userInfo: any }>
    if (res.status) {
      ElMessage.success('登录成功')
      router.push('/')
    } else {
      ElMessage.error(res.message)
    }
  }).finally(() => {
    loading.value = false
  })
}

</script>

<style></style>