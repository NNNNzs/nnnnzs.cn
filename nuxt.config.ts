import { defineNuxtConfig } from "nuxt";

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  css: [
    "~/assets/css/tailwind.css",
    "bytemd/dist/index.css",
    // "~/assets/css/github.css",
  ],
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
