import { defineStore } from "@pinia/nuxt/dist/runtime/composables"

interface AppState {
  theme: string,
  [key: string]: any
}
export const useAppStore = defineStore('app', {
  state(): AppState {
    return {
      theme: 'dark'
    }
  },
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },
    setValueByKey<T extends keyof AppState>(key: T, value: AppState[T]) {
      Object.assign(this.$state, {
        [key]: value
      })
    }
  }
})