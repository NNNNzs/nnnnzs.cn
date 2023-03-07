/** 指定几个为可选 */
declare type PartialKey<T extends Object, K extends keyof T> = Pick<
  T,
  Exclude<keyof T, K>
> &
  Partial<Pick<T, K>>
