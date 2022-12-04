// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [],
  // css: ["@/assets/css/tailwind.css"],
  app: {
    head: {
      title: "孤人独影",
      link: [
        { rel: "shortcut icon", href: "/img/logo_N.png" },
        {
          rel: "stylesheet",
          href: "//at.alicdn.com/t/c/font_3807384_gfjqftmcc.css",
        },
      ],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "charset", content: "utf-8" },
        { name: "author", content: "NNNNzs" },
        { name: "keywords", content: "前端,NNNNzs" },
        { name: "description", content: "看清自己，看透世界，变得更强" },
      ],
    },
  },
  devServer: {
    port: 3002,
  },
  modules: ["@vueuse/nuxt", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      Leancloud_appId: process.env.Leancloud_appId,
      Leancloud_appKey: process.env.Leancloud_appKey,
      Leancloud_serverURL: process.env.Leancloud_serverURL,
      isDev: process.env.NODE_ENV !== "production",
    },
  },
});
