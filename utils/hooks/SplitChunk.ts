import MyIndexDB from "@/utils/hooks/IndexDB"
import axios from "axios"
import RecentUpload from "./RecentUpload"

const recentUpload = new RecentUpload()
// 每个文件切片大小定为10MB;
const bytesPerPiece = 10 * 1024 * 1024
const baseUrl = ""
const myIndexDB = new MyIndexDB("upload")

//
interface SaveData {
  addTime: number
  name: string
  type: string
  blob: Blob
}

// 文件切片并且存储到本地
const splitFile = async (file: File) => {
  const { size, name, type } = file
  // 分片上传
  let index = 0
  // 总共多少个分片
  const totalPieces = Math.ceil(size / bytesPerPiece)

  const wholeSave = async () => {
    const blob = new Blob([file], { type })
    const saveData: SaveData = {
      addTime: new Date().getTime(),
      name,
      type,
      blob
    }

    await myIndexDB.insert(`${name}`, saveData)
  }

  const spilitSave = async () => {
    while (index < totalPieces) {
      const start = index * bytesPerPiece
      let end = start + bytesPerPiece
      if (end > size) {
        end = size
      }
      const chunk = file.slice(start, end) //切割文件
      const chunkName = `${name}.${index}`
      try {
        await myIndexDB.insert(`${chunkName}`, chunk)
        index++
      } catch (error) {
        throw new Error(JSON.stringify(error))
      }
    }
  }

  wholeSave()

  uploadFromIndexDB(name)
}

const uploadFromIndexDB = async (fileName: string) => {
  let mime = ""
  const wholeGet = async () => {
    const obj = (await myIndexDB.selectAsync(fileName)) as {
      id: string
      value: SaveData
    }
    const saveData = obj.value
    const { name, type, blob, addTime } = saveData
    mime = type
    const file = new File([blob], name, { type })
    const totalPieces = Math.ceil(file.size / bytesPerPiece)
    let index = 0

    while (index < totalPieces) {
      const start = index * bytesPerPiece
      let end = start + bytesPerPiece
      if (end > file.size) {
        end = file.size
      }
      const chunk = file.slice(start, end) //切割文件
      const chunkName = `${fileName}.${index}`
      const formData = new FormData()
      formData.append("chunk", chunk)
      formData.append("fileName", fileName)
      formData.append("chunkName", chunkName)

      await axios({
        url: baseUrl + "/uploadChunk",
        method: "post",
        data: formData
      })
    }
    myIndexDB.del(fileName)
  }

  const splitGet = async () => {
    const file = recentUpload.getItem(fileName)
    if (!file) return
    let progress: string = file.progress as string
    let [current, total] = progress.split("/").map((e) => Number(e))
    mime = file.mime
    while (current < total) {
      const chunkName = `${fileName}.${current}`

      const obj = (await myIndexDB.selectAsync(chunkName)) as {
        id: string
        value: Blob
      }
      const chunk = obj.value
      const formData = new FormData()
      formData.append("chunk", chunk)
      formData.append("fileName", fileName)
      formData.append("chunkName", chunkName)

      await axios({
        url: baseUrl + "/uploadChunk",
        method: "post",
        data: formData
      })

      recentUpload.editItem(fileName, {
        addTime: file.addTime,
        mime: file.mime,
        alisa: "",
        fileName: fileName,
        url: "暂无",
        status: "上传中",
        finishTime: new Date().getTime(),
        origin: "主动上传",
        progress: `${++current}/${total}`
      })
      myIndexDB.del(chunkName)
    }
  }

  await wholeGet()

  console.log("上传完成")
}
