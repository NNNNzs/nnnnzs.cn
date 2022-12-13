const debug = true;
// const log = debug ? window.console.log : () => { }
// const a: IDBVersionChangeEvent = IDBVersionChangeEvent
class MyIndexDB {
  db: IDBDatabase = null as any;
  dbName: string = '';
  storeName: string = '';
  constructor(storeName = 'storeName', dbName = "NNNNzs_INDEXED_DB") {

    let request = window.indexedDB.open(dbName);
    this.storeName = storeName;

    request.addEventListener('upgradeneeded', (event: any) => {
      this.db = event.target.result as IDBDatabase;
      // 不存在objectStore实例，创建实例
      if (!this.db.objectStoreNames.contains(storeName)) {
        const objectStore = this.db.createObjectStore(storeName, { keyPath: 'id' });
        // 创建索引
        objectStore.createIndex('id', 'id', { unique: false })
      }
    })

    // request.onupgradeneeded = (event) => {}

    request.onerror = (event) => {
      // 错误
    }

    request.addEventListener('success', (event: any) => {
      if (event?.target?.result) {
        this.db = event.target.result;
      }
    })

  }
  insert = (id: string, value: any) => {
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    transaction.objectStore(this.storeName).add({ id, value });
    return new Promise((resolve, reject) => {
      transaction.onerror = (event: any) => {
        reject(event)
        // log('insert error', event)
      }
      transaction.oncomplete = () => {
        resolve(true)
        // log('insert success')
      }
    })



  }

  select(id: string, cb: any) {
    const objectStore: IDBObjectStore = this.db.transaction([this.storeName]).objectStore(this.storeName);

    const request = objectStore.get(id);

    request.onsuccess = (event) => {
      cb(request.result, event)
    }
  }
  selectAsync(id: string) {
    return new Promise((resolve, reject) => {
      const objectStore = this.db.transaction([this.storeName]).objectStore(this.storeName);
      const request = objectStore.get(id);

      request.onsuccess = (event: any) => {
        resolve(request.result)
      }
      request.onerror = (err: any) => {
        reject(err);
        console.log('indexDB selectError', err)
      }
    })
  }
  del(id: string) {
    const objectStore = this.db.transaction([this.storeName], 'readwrite').objectStore(this.storeName);
    objectStore.delete(id);
  }
  listAll(cb: (cb: any) => void) {
    const objectStore = this.db.transaction([this.storeName], 'readwrite').objectStore(this.storeName);
    objectStore.openCursor().onsuccess = (event: any) => {
      let cursor = event.target.result;
      if (cursor) {
        cb(cursor)
        cursor.continue()
      } else {

      }
    }
  }

  clearAll() {
    const objectStore = this.db.transaction([this.storeName], 'readwrite').objectStore(this.storeName);
    objectStore.openCursor().onsuccess = (event: any) => {
      let cursor = event.target.result;
      if (cursor) {
        this.del(cursor.key)
        cursor.continue()
      } else {
        console.log('清空完成')
      }
    }
  }
}
export default MyIndexDB;
