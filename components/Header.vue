<template>
  <header class="header absolute top-0 text-white px-6">
    <div class="mx-auto">
      <div class="mx-auto menu flex  items-center justify-between leading-4">
        <a class="text-xl text-center align-bottom" href="/">NNNNzs</a>
        <div>
          <ul class="hidden md:flex justify-between category w-auto">
            <NuxtLink class="text-white mr-4" role="li" is="li" :target="item.target || '_self'"
              v-for="item in state.menu" :key="item.name" :to="item.path">{{
                item.name
              }}</NuxtLink>

            <AlgoliaDocSearch />
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup >
import { reactive, toRefs, ref, watchEffect, watch } from "vue";
const base = [
  { name: "首页", path: "/", target: "_self" },
  { name: "分类", path: '/tags' },
]

const loginMenu = [
  { name: "新增", path: EDIT_PAGE + 'edit', target: '_blank' },
  { name: "管理", path: TOOLSE_PERFIX_PAGE + '/admin', target: '_blank' },
  { name: "日志", path: TOOLSE_PERFIX_PAGE + '/log' },
]
const state = reactive({
  value: "",
  menu: base
});

onMounted(async () => {
  const { status } = await $fetch('/api/auth/v', { method: "POST", credentials: 'include' });
  if (status) {
    state.menu = base.concat(loginMenu)
  }
})

</script>
<style lang="less">
.header {
  --height: 36px;
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
          bottom: 0px;
          left: 0;
          content: "";
          width: 100%;
          height: 3px;
          background-color: #fff;
          // background-color: violet;
        }
      }
    }
  }
}
</style>