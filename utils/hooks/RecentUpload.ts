import { ref, watch, Ref } from "vue";
interface Opt {
  max: number
}
type OriginType = "剪贴板" | "主动上传"
type Status = "上传成功" | "同步中" | "上传中"
export interface UploadInfo {
  addTime: number // 添加时间
  finishTime: number | Date // 完成时间
  fileName: string // 文件名
  url: string, // 上传地址
  mime: string, // 文件类型
  alisa: string,//别名
  status: Status // 上传状态
  progress?: number | string // 上传进度
  origin: OriginType // 上传来源
}

type PartialKey<T extends Object, K extends keyof T> = (Pick<T, Exclude<keyof T, K>> & Partial<Pick<T, K>>)

export default class RecentUpload {
  private localKey: string
  private opt: Opt 
  // private request: IDBOpenDBRequest
  public list: Ref<UploadInfo[]>
  constructor(key = "_rencet", opt = { max: 10 }) {
    this.localKey = key
    this.opt = opt;
    const localList: Array<UploadInfo> = this.getList();
    this.list = ref(localList);

    // this.request = window.indexedDB.open(key)
    // this.request.onerror = function (event) {
    //   console.log(' 打开数据库报错');
    // };

    // this.request.onupgradeneeded = function (event) {
    //   const db = event.target.result;
    //   var objectStore = null;
    //   if (!db.objectStoreNames.contains(key)) {
    //     objectStore = db.createObjectStore(key, { keyPath: 'id' });
    //     // unique name可能会重复
    //     objectStore.createIndex('addTime', 'addTime', { unique: true });
    //   }
    // }

    watch(this.list.value, (newVal) => {
      localStorage.setItem(this.localKey, JSON.stringify(newVal))
    })

  }

  getList() {
    const localData = localStorage.getItem(this.localKey)
    if (localData) {
      return JSON.parse(localData)
    } else {
      return []
    }
  }
  add(item: PartialKey<UploadInfo, "status" | "finishTime">) {
    // add(item: Omit<UploadInfo, "finishTime" | "status">) {
    const list = this.list.value;
    if (list.length > this.opt.max) {
      list.pop()
    }
    const uploadInfo: UploadInfo = {
      status: '上传成功',
      finishTime: new Date().getTime(),
      ...item,
    }
    list.unshift(uploadInfo);
  }
  remove(item: UploadInfo) {
    const index = this.list.value.findIndex(e => e === item)
    this.list.value.splice(index, 1)
  }
  getItem(fileName: string) {
    return this.list.value.find(f => f.fileName === fileName)
  }
  setValue(fileName: string, key: keyof UploadInfo, value: any) {
    const index = this.list.value.findIndex(f => f.fileName === fileName)
    // this.list.value[index][key] = value;
  }
  editItem(fileName: string, newData: UploadInfo) {
    const index = this.list.value.findIndex(f => f.fileName === fileName)
    this.list.value[index] = newData;
  }

}