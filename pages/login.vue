<template>
  <NuxtLayout name="login">
    <ClientOnly>
      <div class="w-full h-full flex justify-center items-center">
        <ElForm
          label-position="top"
          :model="logonForm"
          @submit.native.prevent
          :rules="rules"
          ref="logonFormRef"
          class="p-4 w-5/6"
        >
          <ElFormItem label="账号" prop="account">
            <ElInput v-model="logonForm.account"></ElInput>
          </ElFormItem>

          <ElFormItem label="密码" prop="password">
            <ElInput
              type="password"
              v-model="logonForm.password"
            ></ElInput>
          </ElFormItem>

          <ElFormItem>
            <ElButton type="primary" @click="login">登录</ElButton>
          </ElFormItem>

          <ElFormItem label="其他方式">
            <ElLink :href="githubOAuthUrl" class="mr-2">
              <svg-icon class="text-2xl w-4 h-4" name="github"></svg-icon>
            </ElLink>

            <ElLink :href="workWechatOAuthUrl">
              <svg-icon
                class="text-2xl w-4 h-4"
                name="work-wechat"
              ></svg-icon>
            </ElLink>
          </ElFormItem>
        </ElForm>
      </div>
    </ClientOnly>
  </NuxtLayout>
</template>
<script setup lang="ts">
import { reactive } from "vue"
import {
  ElForm,
  ElInput,
  ElFormItem,
  ElMessage,
  ElButton,
  ElLink,
  type FormInstance
} from "element-plus"

const route = useRoute()
const logonFormRef = ref<FormInstance>()

const rules = {
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
}
const logonForm = reactive({
  account: "",
  password: ""
})

const loading = ref(false)
const userInfo = useUserInfoStore()
const { nextPath = "/" } = route.query
type LoginSuccessRes = ResponeBody<{ token: string; userInfo: any }>

const loginSuccessHandler = (r: unknown) => {
  const res = r as LoginSuccessRes
  if (res.status) {
    ElMessage.success("登录成功")
    userInfo.getInfo()
    navigateTo(nextPath as string)
  } else {
    ElMessage.error(res.message)
  }
}

const login = async () => {
  const v = logonFormRef.value?.validate()
  if (!v) return
  loading.value = true

  $fetch(clientUrl + "/user/login", {
    method: "POST",
    body: logonForm
  })
    .then(loginSuccessHandler)
    .finally(() => {
      loading.value = false
    })
}

const loginWithAuth2 = () => {
  const { type, code } = route.query
  let url = ""
  if (type === "github") {
    url = clientUrl + "/user/loginWithGithub"
  }
  if (type === "workwechat") {
    url = clientUrl + "/user/loginWithWorkWechat"
  }
  if (!url) return
  
  loading.value = true
  $fetch(url, {
    method: "POST",
    body: { code }
  })
    .then(loginSuccessHandler)
    .catch(() => {
      loading.value = false
    })
}

onMounted(() => {
  loginWithAuth2()
})
</script>

<style></style>
