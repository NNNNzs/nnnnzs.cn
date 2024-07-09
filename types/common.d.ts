/** 指定几个为可选 */
declare type PartialKey<T extends Object, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
> &
  Partial<Pick<T, K>>




/** 菜单 */
declare interface MenuItem {
  name: string
  path?: string
  target?: HTMLAnchorElement["target"]
  method?: () => void
}

declare type LoginSuccessRes = ResponeBody<{ token: string; userInfo: any }>
