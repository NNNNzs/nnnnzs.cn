import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"

console.log("process.env", process.env.NODE_ENV)

const plugins =
  process.env.NODE_ENV === "development"
    ? [
        Components({
          dts: true,
          resolvers: [ElementPlusResolver()]
        })
      ]
    : []

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [],
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: "孤人独影",
      link: [
        { rel: "shortcut icon", href: "/img/logo_N.png" },
        {
          rel: "stylesheet",
          href: "//at.alicdn.com/t/c/font_3807384_gfjqftmcc.css"
        }
      ],
      script: [
        { src: "https://cdn.jsdelivr.net/npm/@docsearch/js@3" },
        { src: "/js/track.js" }
      ],
      meta: [
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
        { name: "charset", content: "utf-8" },
        { name: "author", content: "NNNNzs" },
        { name: "keywords", content: "前端,NNNNzs" },
        { name: "description", content: "看清自己，看透世界，变得更强" }
      ]
    }
  },
  devServer: {
    port: 3002
  },
  modules: ["@vueuse/nuxt", "@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      Leancloud_appId: process.env.Leancloud_appId,
      Leancloud_appKey: process.env.Leancloud_appKey,
      Leancloud_serverURL: process.env.Leancloud_serverURL,
      isDev: process.env.NODE_ENV !== "production",
      AlgoliasearchAppId: process.env.AlgoliasearchAppId,
      AlgoliasearchApiKey: process.env.AlgoliasearchApiKey
    }
  },
  nitro: {
    devProxy: {
      "/api-remote": {
        target: "http://localhost:3006/",
        changeOrigin: true,
        prependPath: true
        // rewrite: (url: string) => url.replace(/^\/api-remote/, '/')
      }
    }
  },
  routeRules: {
    "/c/tools/": {
      ssr: false,
      headers: { "x-power-by-NNNNzs": "client-only" }
    },
    "/c/**/*.vue": {
      ssr: false,
      headers: { "x-power-by-NNNNzs": "client-only" }
    },
    "/edit/*": {
      ssr: false,
      headers: { "x-power-by-NNNNzs": "client-only" }
    }
  },
  vite: {
    plugins
  },
  build:{
    analyze: true
  }
})
