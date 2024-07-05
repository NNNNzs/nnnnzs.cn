<template>
  <div>
    <div ref="returnTopRef"></div>
    <header
      ref="headerRef"
      class="header fixed backdrop-blur-md bg-white text-slate-900 dark:bg-slate-700 dark:text-white top-0 opacity-[var(--header-opacity)] bg-opacity-[var(--header-bg-opacity)] hover:opacity-100 hover:transform-cpu hover:transition-opacity duration-300"
      :style="`--header-opacity:0`"
    >
      <div class="mx-auto container h-full px-4">
        <div
          class="mx-auto h-full menu flex items-center justify-between leading-8"
        >
          <NuxtLink class="text-xl text-center align-bottom" to="/">
            NNNNzs
          </NuxtLink>

          <div
            class="hidden md:flex flex-row gap-2 justify-between items-center category w-auto"
          >
            <Search></Search>

            <ul class="h-full">
              <NuxtLink
                class="h-full inline-block mr-4 after:bg-white dark:after:bg-slate-800"
                role="li"
                is="li"
                :target="item.target || '_self'"
                v-for="item in menu"
                :key="item.name"
                :to="item.path"
                >{{ item.name }}
              </NuxtLink>
            </ul>

            <DayLightButton :isDark="isDark" @toggleDark="toggleDark" />

            <a
              target="_blank"
              class="h-full align-middle flex items-center"
              href="https://github.com/NNNNzs/nnnnzs.cn"
            >
              <svg-icon class="text-[1.5rem]" name="github"></svg-icon>
            </a>

            <UserAvatar class="h-full" />
          </div>

          <div class="w-4 h-4 md:hidden cursor-pointer">
            <el-icon @click="drawer = !drawer">
              <Menu />
            </el-icon>
          </div>
        </div>
      </div>
      <div
        class="drawer text-black pt-8 fixed w-[8rem] top-0 h-screen bg-white shadow-md flex flex-col text-center right-[-8rem]"
        :class="[drawer ? 'show' : '']"
      >
        <div class="absolute w-4 h-4 right-2 top-2 cursor-pointer">
          <el-icon @click="drawer = !drawer" class="text-black">
            <CircleClose />
          </el-icon>
        </div>
        <NuxtLink
          class="text-black mb-2"
          role="li"
          is="li"
          :target="item.target || '_self'"
          v-for="item in menu"
          :key="item.name"
          :to="item.path"
          >{{ item.name }}</NuxtLink
        >
      </div>
      <div
        ref="scrollBarRef"
        class="absolute bottom-0 h-[1px] bg-slate-500 w-[var(--percent)]"
      ></div>
    </header>
    <ClientOnly>
      <div
        @click="returnTop"
        class="fixed bottom-4 right-5 border rounded shadow hover:shadow-lg w-8 h-8 bg-white cursor-pointer flex justify-center items-center dark:bg-slate-800 dark:text-white"
      >
        <svg-icon
          class="dark:text-white dark:fill-white"
          name="totop"
        ></svg-icon>
      </div>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
import { reactive, toRefs, ref, watchEffect, watch } from "vue"
import { ElIcon } from "element-plus"
import { Menu, CircleClose } from "@element-plus/icons-vue"
import { isDark, toggleDark, setDark } from "~/composables/useSystemDark"
import { useUserInfoStore } from "~/stores/user"

const drawer = ref(false)

const menu: MenuItem[] = [
  { name: "分类", path: "/tags" },
  { name: "归档", path: "/timeline" }
]

const returnTopRef = ref<HTMLElement>()
const headerRef = ref<HTMLElement>()

const returnTop = () => {
  returnTopRef.value?.scrollIntoView({
    behavior: "smooth"
  })
}
const userInfo = useUserInfoStore()

const scrollBarRef = ref<HTMLDivElement>()

onMounted(() => {
  const { y } = useWindowScroll()
  const percent = useCssVar("--percent", scrollBarRef.value)
  const headerPercent = useCssVar("--header-opacity", headerRef.value, {
    initialValue: "1"
  })

  const handlerScroll = () => {
    percent.value =
      ((y.value > 0 ? y.value + window.innerHeight : 0) /
        document.body.scrollHeight) *
        100 +
      "%"
    headerPercent.value = y.value / window.innerHeight + ""
  }

  watchEffect(handlerScroll)
})
</script>
<style lang="less">
.header {
  --height: 3rem;
  height: var(--height);
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
