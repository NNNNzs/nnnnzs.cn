import { ref, watch, Ref } from "vue";


class MyLocalSorage<T> {
  public list: Ref
  public localKey: string

  constructor(localKey: string) {
    this.localKey = localKey
    const localList = this.getList();
    this.list = ref(localList);

    watch(this.list.value, (newVal) => {
      Promise.resolve().then(() => {
        localStorage.setItem(this.localKey, JSON.stringify(newVal))
      })
    })
  }

  getList() {
    const localData = localStorage.getItem(this.localKey)
    if (localData) {
      return JSON.parse(localData) as T[]
    } else {
      return []
    }
  }
  
}
export default MyLocalSorage