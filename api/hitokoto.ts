import axios from "axios"

export const getHitokoto = (): Promise<HitokotoData> => {
  return new Promise((resolve) => {
    axios.get("https://v1.hitokoto.cn/").then((res) => {
      // oneText.value = res.data as HitokotoData
      resolve(res.data as HitokotoData)
    })
  })
}
