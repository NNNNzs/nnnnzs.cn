<template>
  <div class="w-screen h-screen flex justify-center items-center md:mr-20">
    <ElForm
      label-width="80px"
      :model="logonForm"
      @submit.native.prevent
      :rules="rules"
      class="bg-white p-4"
    >
      <ElFormItem label="账号" prop="account">
        <ElInput v-model="logonForm.account"></ElInput>
      </ElFormItem>

      <ElFormItem label="密码" prop="password">
        <ElInput type="password" v-model="logonForm.password"></ElInput>
      </ElFormItem>

      <ElFormItem>
        <ElButton type="primary" @click="login">登录</ElButton>
      </ElFormItem>
      <ElFormItem label="其他">
        <ElLink
          href="https://github.com/login/oauth/authorize?client_id=54e94f475d7a330c6619&scope=user"
        >
          <svg-icon class="text-2xl w-4 h-4" name="github"></svg-icon>
        </ElLink>
      </ElFormItem>
    </ElForm>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue"
import {
  ElForm,
  ElInput,
  ElFormItem,
  ElMessage,
  ElButton,
  ElLink
} from "element-plus"
const route = useRoute()

const rules = {
  account: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
}
const logonForm = reactive({
  account: "",
  password: ""
})

const loading = ref(false)
const router = useRouter()
const login = () => {
  loading.value = true
  $fetch(clientUrl + "/user/login", {
    method: "POST",
    body: logonForm
  })
    .then((r) => {
      const res = r as ResponeBody<{ token: string; userInfo: any }>
      if (res.status) {
        ElMessage.success("登录成功")
        router.push("/")
      } else {
        ElMessage.error(res.message)
      }
    })
    .finally(() => {
      loading.value = false
    })
}
onMounted(() => {
  const { type, code } = route.query
  if (type === "github") {
    loading.value = true
    $fetch(clientUrl + "/user/loginWithGithub", {
      method: "POST",
      body: { code }
    })
      .then((r) => {
        const res = r as ResponeBody<{ token: string; userInfo: any }>
        if (res.status) {
          ElMessage.success("登录成功")
          router.push("/")
        } else {
          ElMessage.error(res.message)
        }
        loading.value = false
      })
      .catch(() => {
        loading.value = false
      })
  }
})

const href =
  "https://github.com/login/oauth/authorize?client_id=54e94f475d7a330c6619&scope=user"
const loginGitHub = () => {
  location.href = href
}
</script>

<style></style>
