import * as ElementPlus from "element-plus/dist/index.full";
import zhCn from "element-plus/es/locale/lang/zh-cn";
// @ts-ignore
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus, {
    locale: zhCn,
  });
});
