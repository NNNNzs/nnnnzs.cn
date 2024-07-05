<template>
  <ElDropdown v-if="userInfo.id">
    <el-avatar :size="24" :src="userInfo.avatar" />
    <template #dropdown>
      <ElDropdownMenu>
        <ElDropdownItem v-for="item in loginMenu" :key="item.name">
          <NuxtLink v-if="item.path" :to="item.path"
            >{{ item.name }}
          </NuxtLink>
          <span v-if="item.method" @click="item.method()">{{
            item.name
          }}</span>
        </ElDropdownItem>
      </ElDropdownMenu>
    </template>
  </ElDropdown>
</template>

<script setup lang="ts">
import {
  ElAvatar,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem
} from "element-plus"
const userInfo = useUserInfoStore()
const route = useRoute()

const loginMenu = computed<MenuItem[]>(() => {
  const postId = inject("postId")

  const isDetailPage =
    POST_DETAIL_PAGE_NAME.includes(route.name as string) && postId

  const base = [
    { name: "个人中心", path: "/user", target: "_self" },
    { name: "新增", path: EDIT_PAGE + "edit" },
    {
      name: "管理",
      path: TOOLSE_PERFIX_PAGE + "/admin",
      role: "admin"
    },
    { name: "日志", path: TOOLSE_PERFIX_PAGE + "/log", role: "admin" },
    {
      name: "编辑",
      path: EDIT_PAGE + postId
    },
    { name: "退出登录", method: loginOut }
  ].filter((e) => {
    if (e.name === "编辑" && !isDetailPage) {
      return false
    }
    if (e.role === "admin") {
      return userInfo.role === "admin"
      // return true
    } else {
      return true
    }
  })

  return base
})

const loginOut = () => {
  userInfo.logout()
  window.location.reload()
}
</script>

<style scoped></style>
