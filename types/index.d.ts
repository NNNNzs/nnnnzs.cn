type PostMeta = {
  title: string
  date: string
  tags: string[]
  updated?: string
  cover?: string
  layout?: string
  disable?: boolean
  keywords?: string
}

type Post = {
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

  likes?: number
  visitors?: number
  url?: string
}

interface HitokotoData {
  creator: string
  from: string
  hitokoto: string
}

// export {}
