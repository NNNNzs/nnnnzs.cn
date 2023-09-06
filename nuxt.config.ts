import Components from "unplugin-vue-components/vite"
import { ElementPlusResolver } from "unplugin-vue-components/resolvers"
import svgIcons, { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import path from 'path'

console.log("process.env", process.env.NODE_ENV)

const totalPlugin = [
  createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'assets/svg')]
  })
]
const plugins =
  process.env.NODE_ENV === "development"
    ? [
      Components({
        dts: true,
        resolvers: [ElementPlusResolver()]
      }),

    ]
    : []

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: [
    '~/assets/css/element-plus.css',
    'md-editor-v3/lib/style.css'
  ],
  app: {
    // pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: "孤人独影",
      link: [
        { rel: "shortcut icon", href: "/img/logo_N.png" },
      ],
      script: [
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
  modules: [
    "@vueuse/nuxt",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/algolia",
    [
      "@pinia/nuxt",
      {
        autoImports: [
          // 自动引入 `defineStore(), storeToRefs()`
          "defineStore",
          "storeToRefs"
        ]
      }
    ]
  ],
  runtimeConfig: {
    public: {
      isDev: process.env.NODE_ENV !== "production",
    }
  },
  /**
   * @see 
   */
  nitro: {
    devProxy: {
      "/api-remote": {
        // target: "http://localhost:3006",
        target: "https://www.nnnnzs.cn/api-remote",
        // target: "https://api.nnnnzs.cn/v2/",
        changeOrigin: true,
        prependPath: true
        // rewrite: (url: string) => url.replace(/^\/api-remote/, '/')
      }
    }
  },
  routeRules: {
    "/c/**/*": {
      ssr: false,
      headers: { "x-power-by-NNNNzs": "client-only" }
    },
    "/edit/*": {
      ssr: false,
      headers: { "x-power-by-NNNNzs": "client-only" }
    }
  },
  vite: {
    // @ts-ignore
    plugins: totalPlugin.concat(plugins)
  },
  build: {
    analyze: false,
  },
  algolia: {
    apiKey: process.env.ALGOLIA_API_KEY,
    applicationId: process.env.ALGOLIA_APP_ID,
    // DocSearch key is used to configure DocSearch extension.
    docSearch: {
      indexName: process.env.ALGOLIA_APP_INDEX_DB,
      facetFilters: ''
    },
    instantSearch: {
      theme: 'algolia'
    }
  },
  experimental: {
    inlineSSRStyles: false
  }
})
