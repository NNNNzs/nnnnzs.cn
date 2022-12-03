import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    "~/assets/css/tailwind.css",
  ],
  meta: {
    title: "孤人独影",
    link: [
      { rel: "shortcut icon", href: "/img/logo_N.png" },
    ],
    meta: [
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "charset", content: "utf-8" },
      { name: "author", content: "NNNNzs" },
      { name: "keywords", content: "前端,NNNNzs" },
      { name: "description", content: "看清自己，看透世界，变得更强" },
    ],
  },
  modules: ["@vueuse/nuxt"],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
});
