import { useStorage } from "@vueuse/core";
import { skipHydrate } from 'pinia'

interface AppState {
  token: string
  theme: string
}
export const useAppStore = defineStore('app', () => {
  const data = useStorage('nnnnzs.cn_app', {
    token: '',
    theme: ''
  });

  const setValueByKey = <T extends keyof AppState>(key: T, value: AppState[T]) => {
    console.log('setValueByKey', key, value);
    Object.assign(data, {
      [key]: value
    })
  }
  return {
    // data: skipHydrate(data),
    data,
    setValueByKey
  }
})