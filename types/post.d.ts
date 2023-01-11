/** 文章元数据 */
declare type PostMeta = {
  title: string
  date: string
  tags: string[]
  updated?: string
  cover?: string
  layout?: string
  disable?: boolean
  keywords?: string
}
declare type PartialKey<T extends Object, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
> &
  Partial<Pick<T, K>>

declare interface Post {
  id?: string | number
  title: string
  oldTitle?: string
  path: string
  cover: string
  tags: string
  date: string | Date
  updated: string | Date
  description: string
  content: string
  hide: string

  likes: number
  visitors: number
  url?: string
}
declare type EditPost = PartialKey<Post, "id">

declare type PostEdit = PartialKey<Post, "likes" | "visitors">

declare interface HitokotoData {
  creator: string
  from: string
  hitokoto: string
}
