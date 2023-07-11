<template>
  <footer class="bg-gray-800 text-gray-400 py-4 mt-8">
    <div class="social  margin-auto">
      <ul class="
          flex
          m-auto
          w-1/5
          max-auto
          justify-around
          items-center
          text-center
          margin-auto
        ">
        <li v-for="s in social" :key="s.href" class="cursor-pointer" :title="s.title">
          <a :href="s.href" target="_blank">
            <svg-icon class="text-4xl text-white w-4 h-4" :name="s.componentName"></svg-icon>
          </a>
        </li>
      </ul>
    </div>

    <div class="copyright text-center">
      <p>©2021 - {{ YEAR }}, content by NNNNzs. All Rights Reserved.</p>
      <p>
        <a href="https://nuxtjs.com/" target="_blank">Nuxt3 </a>
      </p>
      <p>
        <a href="https://beian.miit.gov.cn" target="_blank">皖ICP备16025009号-1</a>
      </p>
    </div>
  </footer>
</template>

<script lang="ts" setup>
interface Social {
  href: string;
  title: string;
  componentName: string;
}
defineOptions({
  name: 'Footer'
})
const social: Social[] = [
  {
    href: "https://github.com/NNNNzs",
    title: "Github",
    componentName: "github",
  },
  {
    href: "https://weibo.com/NNNNzs",
    title: "微博",
    componentName: "weibo",
  },
  {
    href: "https://www.instagram.com/nnnn2s/",
    title: "instagram",
    componentName: "instagram",
  },
  {
    href: "https://twitter.com/NNNNzs",
    title: "twitter",
    componentName: "google",
  },
  {
    href: "https://www.zhihu.com/people/NNNNzs",
    title: "知乎",
    componentName: "zhihu",
  },
];
const YEAR = new Date().getFullYear();
</script>