<template>
  <header class="header absolute top-0 text-white px-6">
    <div class="mx-auto">
      <div class="mx-auto menu flex  items-center justify-between leading-4">
        <a class="text-xl text-center align-bottom" href="/">NNNNzs</a>
        <ul class="hidden md:flex justify-between category w-80">
          <NuxtLink class="text-white" role="li" is="li" :target="item.target || '_self'" v-for="item in state.menu"
            :key="item.name" :to="item.path">{{
    item.name
            }}</NuxtLink>
          <div id="docsearch"></div>
        </ul>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup >
import { reactive, toRefs, ref, watchEffect, watch } from "vue";
import docsearch from '@docsearch/js';
import '@docsearch/css';

onMounted(() => {
  docsearch({
    container: '#docsearch',
    appId: '8NXIJXZLWR',
    indexName: 'blog2',
    apiKey: '951bc176ffb23d41266456cc81baf396',
  });
});

// const token = useCookie('NNNNzs_uuid');
// console.log('token', token.value);


const state = reactive({
  value: "",
  menu: [
    { name: "首页", path: "/" },
    { name: "分类", path: '/tags' },
    // { name: "新增", path: '/edit/edit', target: '_blank' },
    // { name: "旅游", path: "/travel" },
    // { name: "动态", path: "/center" },
    // { name: "关于", path: "/about" },
  ],
});
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