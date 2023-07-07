<template>
  <header class="header  bg-white text-slate-900 dark:bg-slate-900 dark:text-white  absolute top-0">
    <div class="mx-auto container h-full">
      <div class="mx-auto h-full menu flex items-center justify-between leading-8 ">
        <a class="text-xl text-center align-bottom" href="/">NNNNzs</a>

        <div class="hidden md:flex justify-between category w-auto h-full">
          <Search class="mr-4"></Search>

          <ul class="h-full">
            <NuxtLink class="h-full inline-block mr-4 after:bg-white dark:after:bg-slate-800" role="li" is="li"
              :target="item.target || '_self'" v-for="item in state.menu" :key="item.name" :to="item.path">{{ item.name }}
            </NuxtLink>
          </ul>
          <button @click="toggleDark()" class="mr-4">
            <ClientOnly>
              <svg-icon class="text-[1.2rem]" :name="isDark ? 'moon' : 'sun'"></svg-icon>
            </ClientOnly>
          </button>
          <a target="_blank" class="mr-4 h-full align-middle flex items-center" href="https://github.com/NNNNzs/nnnnzs.cn">
            <svg-icon class="text-[1.2rem]" name="github"></svg-icon>
          </a>
        </div>
        <div class="w-4 h-4 md:hidden cursor-pointer">
          <el-icon @click="drawer = !drawer">
            <Menu />
          </el-icon>
        </div>
      </div>
    </div>
    <div class="drawer pt-8 fixed w-[8rem] top-0 h-screen bg-white shadow-md flex flex-col text-center right-[-8rem]"
      :class="[drawer ? 'show' : '']">
      <div class="absolute w-4 h-4 right-2 top-2 cursor-pointer">
        <el-icon @click="drawer = !drawer" class="text-black">
          <CircleClose />
        </el-icon>
      </div>
      <NuxtLink class="text-black" role="li" is="li" :target="item.target || '_self'" v-for="item in state.menu"
        :key="item.name" :to="item.path">{{ item.name }}</NuxtLink>
      <div class="w-full  text-slate-800">
        <button class="text-center" @click="toggleDark()">
          <svg-icon class="" :name="isDark ? 'moon' : 'sun'"></svg-icon>
        </button>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, watchEffect, watch } from "vue"
import { ElIcon } from "element-plus"
import { Menu, CircleClose } from "@element-plus/icons-vue"
import { isDark, toggleDark } from "~/composables/useSystemDark"

watchEffect(() => {
  console.log('isDark', isDark.value)
})
const base = [
  { name: "首页", path: "/", target: "_self" },
  { name: "分类", path: "/tags" },
  { name: "归档", path: "/timeline" }
];


const drawer = ref(false)
const loginMenu = [
  { name: "新增", path: EDIT_PAGE + "edit", target: "_blank" },
  { name: "管理", path: TOOLSE_PERFIX_PAGE + "/admin", target: "_blank" },
  { name: "日志", path: TOOLSE_PERFIX_PAGE + "/log" }
]
const state = reactive({
  value: "",
  menu: base
})

onMounted(async () => {
  const { status } = await $fetch("/api/auth/v", {
    method: "POST",
    credentials: "include"
  })
  if (status) {
    state.menu = base.concat(loginMenu)
  }
})
</script>
<style lang="less">
.header {
  --height: 3rem;
  height: var(--height);
  margin-bottom: var(--space);
  box-shadow: 0 1px 3px rgb(18 18 18 / 10%);
  width: 100%;
  z-index: 2;

  .menu {
    .category {
      line-height: var(--height);
      font-size: 16px;

      .router-link-exact-active {
        // color: var(--tw-text-opacity);
        position: relative;

        &::after {
          position: absolute;
          bottom: 0;
          left: 0;
          content: "";
          width: 100%;
          height: 1px;
        }
      }
    }
  }

  .drawer {
    z-index: 9;
    transition: transform 300ms cubic-bezier(0, 0, 0, 1.16) 0s;

    &.show {
      transform: translateX(-8rem);
    }
  }
}
</style>
