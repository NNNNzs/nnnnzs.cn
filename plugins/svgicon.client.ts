import svgIcon from '@/components/SvgIcon.client.vue'
import 'virtual:svg-icons-register'
export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.component('svg-icon', svgIcon)
})