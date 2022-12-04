export type PostMeta = {
  title: string;
  date: string;
  tags: string[];
  updated?: string;
  cover?: string;
  layout?: string;
  disable?: boolean;
  keywords?: string;
};

export type Post = {
  id?: string | number;
  title: string;
  oldTitle?: string;
  path: string;
  cover: string;
  tags: string;
  date: string | Date;
  updated: string | Date;
  description: string;
  content: string;

  likes?: number;
  visitors?: number;
  url?: string;
};

declare interface HitokotoData {
  creator: string;
  from: string;
  hitokoto: string;
}
