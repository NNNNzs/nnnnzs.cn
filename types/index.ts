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
  title: string;
  meta: PostMeta;
  path: String;
  description: string;
  content: string;
  origin: string;
  html: string;
};

declare interface HitokotoData {
  creator: string;
  from: string;
  hitokoto: string;
}
