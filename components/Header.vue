<template>
  <header class="header absolute top-0 text-white px-6">
    <div class="mx-auto">
      <div class="mx-auto menu flex  items-center justify-between">
        <span class="text-xl text-center align-bottom">NNNNzs</span>
        <ais-instant-search class="text-black" :index-name="indexName" :search-client="searchClient">
          <ais-search-box>
          </ais-search-box>
          <ais-hits />
        </ais-instant-search>
        <ul class="hidden md:flex justify-between category w-80">
          <router-link class="text-white" role="li" is="li" v-for="item in state.menu" :key="item.name"
            :to="item.path">{{
                item.name
            }}</router-link>

        </ul>
        <ul class="flex md:hidden flex-col leading-8">
          <router-link class="text-white" role="li" is="li" v-for="item in state.menu" :key="item.name"
            :to="item.path">{{
            item.name }}</router-link>
        </ul>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup >
import { reactive, toRefs, ref, watchEffect, watch } from "vue";
import algoliasearch from 'algoliasearch/lite';
import { AisInstantSearch, AisSearchBox, AisHits } from 'vue-instantsearch/vue3/es/index.js'
import 'instantsearch.css/themes/satellite-min.css';
const config = useRuntimeConfig()
// const { dark, changeTheme } = useDark();
const searchClient = algoliasearch(config.public.AlgoliasearchAppId, config.public.AlgoliasearchApiKey);
const indexName = 'blog'

const state = reactive({
  value: "",
  menu: [
    { name: "首页", path: "/" },
    { name: "分类", path: '/tags' },
    // { name: "旅游", path: "/travel" },
    // { name: "动态", path: "/center" },
    // { name: "关于", path: "/about" },
  ],
});
</script>
<style lang="less">
.header {
  --height: var(--header-height);
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
        color: var(--primary-color);
        position: relative;

        &::after {
          position: absolute;
          bottom: 0px;
          left: 0;
          content: "";
          width: 100%;
          height: 3px;
          background-color: violet;
        }
      }
    }

    .searchBar {
      line-height: var(--height);
    }

    .user {
      line-height: var(--height);

      .icons {
        cursor: pointer;
        vertical-align: middle;
        line-height: var(--height);
        font-size: 1.5rem;
        color: var(--sub-color);
        width: var(--height);
        height: var(--height);

        svg {
          vertical-align: middle;
        }
      }
    }
  }
}
</style>